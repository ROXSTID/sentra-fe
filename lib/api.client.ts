import { authService } from './auth.service';
import { envConfig } from './env.config';

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${envConfig.SERVER_URL}api/v1/`;
  }

  /**
   * Make an authenticated API request
   */
  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Get current auth header
      let authHeader = authService.getAuthHeader();
      
      // Prepare headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (authHeader) {
        headers['Authorization'] = authHeader;
      }

      // Make the request
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: headers as HeadersInit,
      });

      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401 && authHeader) {
        try {
          const newToken = await authService.refreshToken();
          headers['Authorization'] = `Bearer ${newToken}`;
          
          // Retry the request with new token
          const retryResponse = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers: headers as HeadersInit,
          });
          
          return this.handleResponse<T>(retryResponse);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          authService.logout();
          throw new Error('Authentication expired. Please login again.');
        }
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Request failed',
        status: 0,
      };
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    if (contentType && contentType.includes('application/json')) {
      try {
        const data = await response.json();
        
        if (response.ok) {
          return { data, status: response.status };
        } else {
          return {
            error: data.message || data.error || `HTTP ${response.status}`,
            status: response.status,
          };
        }
      } catch (parseError) {
        return {
          error: 'Failed to parse response',
          status: response.status,
        };
      }
    } else {
      // Handle non-JSON responses
      if (response.ok) {
        return { status: response.status };
      } else {
        return {
          error: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        };
      }
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Convenience functions for common API operations
export const api = {
  get: <T>(endpoint: string) => apiClient.get<T>(endpoint),
  post: <T>(endpoint: string, data?: any) => apiClient.post<T>(endpoint, data),
  put: <T>(endpoint: string, data?: any) => apiClient.put<T>(endpoint, data),
  patch: <T>(endpoint: string, data?: any) => apiClient.patch<T>(endpoint, data),
  delete: <T>(endpoint: string) => apiClient.delete<T>(endpoint),
};
