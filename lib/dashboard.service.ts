import { envConfig } from './env.config';
import { authService } from './auth.service';

export interface DashboardStats {
  total_mentions: number;
  negative_percentage: number;
  latest_tweets: Tweet[];
  sentiment_counts: SentimentCounts;
}

export interface Tweet {
  id: string;
  username: string;
  content: string;
  date: string;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface SentimentCounts {
  negative: number;
  neutral: number;
  positive: number;
}

class DashboardService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${envConfig.SERVER_URL}api/v1/`;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Get the authorization header with Bearer token
      const authHeader = authService.getAuthHeader();
      
      if (!authHeader) {
        throw new Error('No access token available. Please login again.');
      }

      console.log('DashboardService: Fetching dashboard stats with auth header:', authHeader.substring(0, 20) + '...');
      console.log('DashboardService: Request URL:', `${this.baseUrl}dashboard/stats/`);

      const response = await fetch(`${this.baseUrl}dashboard/stats/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
      });

      console.log('DashboardService: Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('DashboardService: Error response:', errorText);
        
        // If we get a 401, try to refresh the token and retry once
        if (response.status === 401) {
          console.log('DashboardService: Token expired, attempting refresh...');
          try {
            await authService.refreshToken();
            // Retry the request with the new token
            const newAuthHeader = authService.getAuthHeader();
            if (newAuthHeader) {
              console.log('DashboardService: Retrying with refreshed token...');
              const retryResponse = await fetch(`${this.baseUrl}dashboard/stats/`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': newAuthHeader,
                },
              });
              
              if (retryResponse.ok) {
                const data = await retryResponse.json();
                console.log('DashboardService: Successfully fetched dashboard stats after token refresh:', data);
                return data;
              }
            }
          } catch (refreshError) {
            console.error('DashboardService: Token refresh failed:', refreshError);
            throw new Error('Authentication failed. Please login again.');
          }
        }
        
        throw new Error(`Failed to fetch dashboard stats: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('DashboardService: Successfully fetched dashboard stats:', data);
      return data;
    } catch (error) {
      console.error('DashboardService: Error fetching dashboard stats:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
