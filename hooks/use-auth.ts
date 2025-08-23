import { useState, useEffect, useCallback } from 'react';
import { authService, type AuthResponse, type LoginCredentials } from '@/lib/auth.service';

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  error: string | null;
}

export interface UseAuthReturn extends AuthState {
  loginWithDemo: () => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    error: null,
  });

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const isAuthenticated = authService.isAuthenticated();
        const user = authService.getUser();
        
        setState(prev => ({
          ...prev,
          isAuthenticated,
          user,
          isLoading: false,
        }));
      } catch (error) {
        console.error('Auth initialization error:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  // Login with demo credentials
  const loginWithDemo = useCallback(async () => {
    console.log('useAuth: Starting demo login...')
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log('useAuth: Calling authService.loginWithDemo()...')
      const response = await authService.loginWithDemo();
      console.log('useAuth: Login successful, response:', response)
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
        error: null,
      }));

      console.log('useAuth: Redirecting to dashboard...')
      // Redirect to dashboard after successful login
      try {
        window.location.href = '/dashboard';
        // Fallback redirect if the above doesn't work
        setTimeout(() => {
          if (window.location.pathname !== '/dashboard') {
            console.log('useAuth: Fallback redirect to dashboard')
            window.location.replace('/dashboard');
          }
        }, 100);
      } catch (redirectError) {
        console.error('useAuth: Redirect failed, trying fallback:', redirectError)
        window.location.replace('/dashboard');
      }
    } catch (error) {
      console.error('useAuth: Demo login failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Demo login failed',
      }));
    }
  }, []);

  // Login with custom credentials
  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await authService.login(credentials);
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: response.user,
        isLoading: false,
        error: null,
      }));

      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
      }));

      // Redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Logout failed',
      }));
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    loginWithDemo,
    login,
    logout,
    clearError,
  };
}
