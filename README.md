# EduMoodAI - Mood-Based Learning Path Recommender

A personalized learning platform that adapts content recommendations based on your current mood and tracks your progress over time.
https://dapper-choux-8a514e.netlify.app/

## Features

- **Mood-Based Learning**: Get personalized content recommendations based on your current emotional state
- **User Authentication**: Secure Google OAuth integration via Supabase
- **Progress Tracking**: Monitor your learning journey and completion rates
- **Mood History**: Track your emotional patterns over time
- **Responsive Design**: Beautiful, modern interface that works on all devices

## Setup Instructions

### 1. Supabase Configuration

1. **Connect to Supabase**: Click the "Connect to Supabase" button in the top right corner of Bolt
2. **Configure Google OAuth**:
   - Go to your Supabase Dashboard
   - Navigate to Authentication → Providers
   - Enable the Google provider
   - Add your Google OAuth credentials:
     - Client ID: Get from Google Cloud Console
     - Client Secret: Get from Google Cloud Console
   - Add your site URL to "Redirect URLs": `https://your-domain.com/**`

### 2. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `https://your-supabase-project.supabase.co/auth/v1/callback`
   - `http://localhost:5173` (for development)

### 3. Environment Variables

Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup

The database migrations will be automatically applied when you connect to Supabase. They include:

- **user_profiles**: Store user information and preferences
- **mood_entries**: Track user mood selections over time
- **learning_progress**: Monitor learning sessions and completions

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Troubleshooting

### "Refuse to connect with Gmail" Error

This error typically occurs when Google OAuth is not properly configured. Follow these steps:

1. **Check Supabase Configuration**:
   - Ensure Google provider is enabled in Supabase Auth settings
   - Verify your Google OAuth credentials are correctly entered
   - Confirm your redirect URLs include your domain

2. **Verify Google Cloud Console**:
   - Make sure your OAuth consent screen is configured
   - Check that your redirect URIs match exactly
   - Ensure the Google+ API is enabled

3. **Check Environment Variables**:
   - Verify your `.env` file has the correct Supabase URL and anon key
   - Restart your development server after adding environment variables

### Common Issues

- **CORS Errors**: Make sure your domain is added to Supabase's allowed origins
- **Redirect Loops**: Check that your redirect URLs don't have trailing slashes
- **Session Issues**: Clear your browser cache and cookies for the site

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Authentication**: Google OAuth via Supabase Auth
- **Icons**: Lucide React
- **Build Tool**: Vite

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
