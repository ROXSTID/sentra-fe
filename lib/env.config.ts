// Environment Configuration
// Copy this to a .env file in your project root and fill in the actual values

export const envConfig = {
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Next.js
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Server Configuration
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8000/',
  
  // Database (uncomment and configure when needed)
  // DATABASE_URL: process.env.DATABASE_URL,
  
  // Authentication (uncomment and configure when needed)
  // NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  // NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  
  // API Configuration (uncomment and configure when needed)
  // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  // API_KEY: process.env.API_KEY,
  
  // External Services (uncomment and configure when needed)
  // STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  // STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  
  // Email Configuration (uncomment and configure when needed)
  // SMTP_HOST: process.env.SMTP_HOST,
  // SMTP_PORT: parseInt(process.env.SMTP_PORT || '587'),
  // SMTP_USER: process.env.SMTP_USER,
  // SMTP_PASSWORD: process.env.SMTP_PASSWORD,
} as const;

// Type for environment variables
export type EnvConfig = typeof envConfig;

// Helper function to get environment variable
export function getEnvVar(key: keyof EnvConfig): string | undefined {
  return process.env[key] || envConfig[key];
}

// Validate required environment variables
export function validateEnv() {
  const requiredVars: (keyof EnvConfig)[] = [
    // Add any required environment variables here
    // 'DATABASE_URL',
    // 'NEXTAUTH_SECRET',
  ];

  const missingVars = requiredVars.filter(key => !process.env[key]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}
