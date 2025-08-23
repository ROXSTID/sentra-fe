# Environment Variables Setup

This project uses environment variables for configuration. Follow these steps to set up your environment:

## 1. Create Environment File

Create a `.env` file in your project root directory (same level as `package.json`):

```bash
# Windows PowerShell
New-Item -Path .env -ItemType File

# Or manually create a file named .env
```

## 2. Basic Environment Variables

Copy these basic variables to your `.env` file:

```env
# Environment
NODE_ENV=development

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Add other variables as needed (see examples below)
```

## 3. Available Environment Variables

### Required Variables
- `NODE_ENV`: Set to `development`, `production`, or `test`

### Optional Variables

#### Next.js
- `NEXT_PUBLIC_APP_URL`: Your application URL (defaults to http://localhost:3000)

#### Server Configuration
- `SERVER_URL`: Your backend server URL (defaults to http://localhost:8000/) - API endpoints will be prefixed with `/api/v1/`

#### Database (uncomment when needed)
- `DATABASE_URL`: Your database connection string

#### Authentication (uncomment when needed)
- `NEXTAUTH_SECRET`: Secret key for NextAuth.js
- `NEXTAUTH_URL`: NextAuth.js URL (defaults to http://localhost:3000)

#### API Configuration (uncomment when needed)
- `NEXT_PUBLIC_API_URL`: Your API base URL
- `API_KEY`: Your API key

#### External Services (uncomment when needed)
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

#### Email (uncomment when needed)
- `SMTP_HOST`: SMTP server host
- `SMTP_PORT`: SMTP server port (defaults to 587)
- `SMTP_USER`: SMTP username
- `SMTP_PASSWORD`: SMTP password

## 4. Using Environment Variables in Code

Import the configuration from `lib/env.config.ts`:

```typescript
import { envConfig, getEnvVar } from '@/lib/env.config';

// Access environment variables
const appUrl = envConfig.NEXT_PUBLIC_APP_URL;
const apiKey = getEnvVar('API_KEY');

// Validate required variables (call this early in your app)
import { validateEnv } from '@/lib/env.config';
validateEnv();
```

## 5. Security Notes

- **Never commit your `.env` file** to version control
- **Only use `NEXT_PUBLIC_` prefix** for variables that need to be exposed to the browser
- **Keep sensitive keys secure** and rotate them regularly
- **Use different values** for development, staging, and production environments

## 6. Example .env File

```env
# Development Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Server Configuration
SERVER_URL=http://localhost:8000/

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# Authentication
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=https://api.example.com
API_KEY=your-api-key-here
```

## 7. Troubleshooting

- **Restart your development server** after adding new environment variables
- **Check the console** for any validation errors
- **Verify variable names** match exactly (case-sensitive)
- **Ensure `.env` file** is in the project root directory

## 8. Production Deployment

For production, set environment variables in your hosting platform:
- **Vercel**: Use the Environment Variables section in your project settings
- **Netlify**: Use the Environment Variables section in your site settings
- **Railway/Render**: Use the Variables section in your service settings
