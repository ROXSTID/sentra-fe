import { envConfig } from './env.config';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    role: string;
    is_active: boolean;
    email_verified: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
  };
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

class AuthService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = envConfig.SERVER_URL;
  }

  /**
   * API Endpoints used:
   * - POST {baseUrl}api/v1/auth/login/     - Login with credentials
   * - POST {baseUrl}api/v1/auth/refresh/   - Refresh access token
   * - POST {baseUrl}api/v1/auth/logout/    - Logout (optional)
   */

  /**
   * Login with demo credentials
   */
  async loginWithDemo(): Promise<AuthResponse> {
    const credentials: LoginCredentials = {
      email: 'demo@mail.com',
      password: 'demo1234'
    };

    console.log('AuthService: Attempting demo login to:', `${this.baseUrl}api/v1/auth/login/`)
    console.log('AuthService: Credentials:', credentials)

    try {
      const response = await fetch(`${this.baseUrl}api/v1/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('AuthService: Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('AuthService: Response error text:', errorText)
        throw new Error(`Login failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: AuthResponse = await response.json();
      console.log('AuthService: Login successful, data:', data)
      
      // Store tokens in localStorage
      this.storeTokens({
        access: data.tokens.access,
        refresh: data.tokens.refresh
      });

      // Store user info
      this.storeUser(data.user);

      return data;
    } catch (error) {
      console.error('AuthService: Demo login error:', error);
      throw error;
    }
  }

  /**
   * Login with custom credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}api/v1/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens in localStorage
      this.storeTokens({
        access: data.tokens.access,
        refresh: data.tokens.refresh
      });

      // Store user info
      this.storeUser(data.user);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string> {
    const tokens = this.getTokens();
    
    if (!tokens?.refresh) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${this.baseUrl}api/v1/auth/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: tokens.refresh
        }),
      });

      if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update stored access token
      this.updateAccessToken(data.access);
      
      return data.access;
    } catch (error) {
      console.error('Token refresh error:', error);
      // Clear tokens on refresh failure
      this.clearAuth();
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const tokens = this.getTokens();
      
      if (tokens?.access) {
        // Call logout endpoint if available
        await fetch(`${this.baseUrl}api/v1/auth/logout/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${tokens.access}`,
            'Content-Type': 'application/json',
          },
        }).catch(() => {
          // Ignore logout endpoint errors
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      this.clearAuth();
    }
  }

  /**
   * Get stored tokens
   */
  getTokens(): AuthTokens | null {
    try {
      const access = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');
      
      if (access && refresh) {
        return { access, refresh };
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get stored user info
   */
  getUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const tokens = this.getTokens();
    return !!(tokens?.access);
  }

  /**
   * Get authorization header for API requests
   */
  getAuthHeader(): string | null {
    const tokens = this.getTokens();
    return tokens?.access ? `Bearer ${tokens.access}` : null;
  }

  /**
   * Store tokens in localStorage
   */
  private storeTokens(tokens: AuthTokens): void {
    try {
      localStorage.setItem('access_token', tokens.access);
      localStorage.setItem('refresh_token', tokens.refresh);
    } catch (error) {
      console.error('Failed to store tokens:', error);
    }
  }

  /**
   * Store user info in localStorage
   */
  private storeUser(user: any): void {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user:', error);
    }
  }

  /**
   * Update access token
   */
  private updateAccessToken(access: string): void {
    try {
      localStorage.setItem('access_token', access);
    } catch (error) {
      console.error('Failed to update access token:', error);
    }
  }

  /**
   * Clear all authentication data
   */
  private clearAuth(): void {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear auth:', error);
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
