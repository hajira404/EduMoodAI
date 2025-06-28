# EduMoodAI Setup Guide

## Prerequisites

Before setting up EduMoodAI, ensure you have:

- Node.js 18+ installed
- Git installed
- A GitHub account
- A Google Cloud Platform account
- A Supabase account

## Step 1: Clone and Setup Local Development

### 1.1 Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `edumoodai` or your preferred name
3. Make it public or private as needed
4. Don't initialize with README (we'll push existing code)

### 1.2 Initialize Git in Your Project

```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: EduMoodAI mood-based learning platform"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

### 1.3 Install Dependencies

```bash
# Install all project dependencies
npm install

# Verify installation
npm run dev
```

## Step 2: Supabase Configuration

### 2.1 Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `EduMoodAI`
   - Database Password: (generate a strong password)
   - Region: (choose closest to your users)

### 2.2 Configure Environment Variables

1. In your Supabase dashboard, go to Settings → API
2. Copy your project URL and anon key
3. Create `.env` file in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 2.3 Run Database Migrations

The migrations are already created in `supabase/migrations/`. They will be automatically applied when you connect to Supabase through Bolt.

If you need to run them manually:

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link project: `supabase link --project-ref your-project-id`
4. Push migrations: `supabase db push`

## Step 3: Google OAuth Setup

### 3.1 Google Cloud Console Configuration

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable required APIs:
   - Go to "APIs & Services" → "Library"
   - Search and enable "Google+ API"

### 3.2 Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Configure OAuth consent screen first if prompted:
   - User Type: External
   - App name: EduMoodAI
   - User support email: your email
   - Developer contact: your email
4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Name: EduMoodAI
   - Authorized redirect URIs:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     http://localhost:5173/auth/callback
     ```

### 3.3 Configure Supabase Auth

1. In Supabase dashboard, go to Authentication → Providers
2. Enable Google provider
3. Enter your Google OAuth credentials:
   - Client ID: from Google Cloud Console
   - Client Secret: from Google Cloud Console
4. Add Site URL: `http://localhost:5173` (for development)
5. Add Redirect URLs: `http://localhost:5173/**`

## Step 4: Deployment Setup

### 4.1 Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables in Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

### 4.2 Update OAuth for Production

1. In Google Cloud Console, add production URL to authorized redirect URIs:
   ```
   https://your-netlify-domain.netlify.app/auth/callback
   ```
2. In Supabase, update Site URL and Redirect URLs with production domain

## Step 5: Testing and Verification

### 5.1 Local Testing

```bash
# Start development server
npm run dev

# Test features:
# 1. Mood selection
# 2. Content generation
# 3. Google OAuth login
# 4. Progress tracking
```

### 5.2 Production Testing

1. Deploy to Netlify
2. Test all features on production URL
3. Verify Google OAuth works
4. Check database connections

## Step 6: GitHub Repository Setup

### 6.1 Repository Structure

Ensure your repository has:

```
edumoodai/
├── .env.example          # Environment variables template
├── README.md             # Project overview and setup
├── PROJECT_DOCUMENTATION.md  # Detailed documentation
├── SETUP_GUIDE.md        # This setup guide
├── package.json          # Dependencies and scripts
├── src/                  # Source code
├── supabase/            # Database migrations
└── public/              # Static assets
```

### 6.2 Update README.md

Make sure your README.md includes:
- Project description
- Live demo link
- Setup instructions
- Technology stack
- Contributing guidelines

### 6.3 Create GitHub Pages (Optional)

1. Go to repository Settings → Pages
2. Select source: Deploy from a branch
3. Choose `main` branch and `/docs` folder
4. Add documentation to `/docs` folder

## Troubleshooting

### Common Issues

1. **"Refuse to connect with Gmail"**
   - Check Google OAuth configuration
   - Verify redirect URIs match exactly
   - Ensure Google+ API is enabled

2. **Supabase Connection Errors**
   - Verify environment variables
   - Check project URL and keys
   - Ensure RLS policies are correct

3. **Build Failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Verify all dependencies are installed

### Getting Help

- Check Supabase documentation: https://supabase.com/docs
- Google OAuth guide: https://developers.google.com/identity/protocols/oauth2
- React documentation: https://react.dev
- Open an issue in the GitHub repository

## Next Steps

After successful setup:

1. Customize the content generation algorithms
2. Add more mood categories and content types
3. Implement advanced analytics
4. Add social features
5. Optimize for mobile devices
6. Add internationalization support

## Security Checklist

- [ ] Environment variables are not committed to Git
- [ ] Google OAuth is properly configured
- [ ] Supabase RLS policies are enabled
- [ ] HTTPS is enforced in production
- [ ] API keys are properly secured
- [ ] User data is encrypted
- [ ] CORS is properly configured

Congratulations! Your EduMoodAI platform should now be fully functional and ready for users.