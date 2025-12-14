# DataLeaf Vercel Deployment Guide

This guide explains how to deploy the DataLeaf project (server, client, and admin) to Vercel with Turso database.

## Prerequisites

- Vercel account
- Turso account  
- Git repository for your code

## Step 1: Set up Turso Database

1. **Install Turso CLI** (optional, can use web interface):
   ```bash
   curl -sSfL https://get.tur.so/install.sh | bash
   ```

2. **Create a Turso database**:
   ```bash
   turso db create dataleaf-panel
   ```

3. **Get your database URL**:
   ```bash
   turso db show dataleaf-panel --url
   ```
   Copy the URL (looks like: `libsql://your-db.turso.io`)

4. **Create an auth token**:
   ```bash
   turso db tokens create dataleaf-panel
   ```
   Copy the token (starts with `eyJ...`)

5. **Optional: Migrate existing SQLite data to Turso**:
   If you have existing data in `database.sqlite`, you can migrate it:
   ```bash
   # Connect to your Turso database
   turso db shell dataleaf-panel < path/to/schema.sql
   ```

## Step 2: Prepare Your Code for Deployment

All necessary configuration files have been created. Review the changes:

### Root Configuration
- ✅ `vercel.json` - Unified routing configuration  

### Server Configuration
- ✅ `server/.env.production` - Production environment template
- ✅ `server/models/index.js` - Turso database support
- ✅ `server/index.js` - CORS configuration for Vercel

### Client Configuration
- ✅ `client/.env.production` - API URL set to `/api`

### Admin Configuration
- ✅ `admin/.env.production` - API URL set to `/api`
- ✅ `admin/src/App.js` - React Router basename set to `/admin`
- ✅ `admin/config-overrides.js` - Public path set to `/admin/`

## Step 3: Push Code to Git Repository

1. **Initialize git (if not already done)**:
   ```bash
   git init
   git add .
   git commit -m "Configure for Vercel deployment with Turso"
   ```

2. **Push to GitHub/GitLab/Bitbucket**:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

### Option A: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? **No**
   - Project name: **dataleaf-panel**
   - Directory: **./` (root)**

4. **Set environment variables**:
   ```bash
   vercel env add TURSO_DATABASE_URL
   # Paste your Turso database URL
   
   vercel env add TURSO_AUTH_TOKEN
   # Paste your Turso auth token
   
   vercel env add JWT_SECRET
   # Enter a secure random string (e.g., use: openssl rand -base64 32)
   
   vercel env add NODE_ENV
   # Enter: production
   ```

5. **Deploy to production**:
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. **Go to** [vercel.com](https://vercel.com) and sign in

2. **Import your Git repository**:
   - Click "Add New..." → "Project"
   - Select your Git provider and repository
   - Click "Import"

3. **Configure project settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: Leave empty (Vercel will use the config from `vercel.json`)
   - **Output Directory**: Leave empty

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `TURSO_DATABASE_URL` | Your Turso DB URL | Production |
   | `TURSO_AUTH_TOKEN` | Your Turso auth token | Production |
   | `JWT_SECRET` | A secure random string | Production |
   | `NODE_ENV` | `production` | Production |

5. **Click "Deploy"**

   Vercel will build and deploy your application.

## Step 5: Verify Deployment

Once deployment completes, you'll get a URL like `https://dataleaf-panel.vercel.app`

Test the following:

1. **Server API** - Visit `/api/health`:
   ```
   https://your-domain.vercel.app/api/health
   ```
   Should return: `{"status":"OK","timestamp":"..."}`

2. **Client** - Visit root:
   ```
   https://your-domain.vercel.app/
   ```
   Should load the client application

3. **Admin** - Visit `/admin`:
   ```
   https://your-domain.vercel.app/admin
   ```
   Should load the admin panel

## Step 6: Database Initialization

On first deployment, the database tables need to be created. Vercel serverless functions will auto-sync the database schema when the first API call is made.

To manually trigger initialization:
1. Visit any API endpoint (e.g., `/api/health`)
2. Try accessing the client or admin login page
3. Check Vercel deployment logs for "Database models synchronized" message

## Troubleshooting

### Issue: CORS Errors

**Solution**: The CORS configuration now accepts any `.vercel.app` domain. If you're using a custom domain, add it to the `allowedOrigins` array in `server/index.js`.

### Issue: Admin routes return 404

**Solution**: Verify that:
- `admin/src/App.js` has `basename="/admin"` prop on `<Router>`
- `admin/config-overrides.js` sets `publicPath: '/admin/'`
- `vercel.json` routes admin paths correctly

### Issue: Database connection errors

**Solution**: 
- Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are set in Vercel environment variables
- Check Vercel function logs for detailed error messages
- Ensure your Turso database is accessible (not paused/deleted)

### Issue: Build failures

**Solution**:
- Check Vercel deployment logs for specific errors
- Ensure all dependencies are listed in `package.json` files
- Verify Node.js version compatibility (Vercel uses Node 18+ by default)

## Custom Domain (Optional)

To add a custom domain:

1. Go to Vercel project settings → "Domains"
2. Add your domain
3. Configure DNS records as instructed by Vercel
4. Update `allowedOrigins` in `server/index.js` to include your custom domain

## Local Development

The configuration maintains local development compatibility:

```bash
# Terminal 1 - Server
cd server
npm install
npm run dev

# Terminal 2 - Client
cd client
npm install
npm start

# Terminal 3 - Admin
cd admin
npm install
npm start
```

Local URLs:
- Client: `http://localhost:3000`
- Admin: `http://localhost:3001`
- Server: `http://localhost:5000`

## Environment Variables Summary

### Server (Vercel Dashboard or `.env.production`)
```
NODE_ENV=production
JWT_SECRET=<your-secret-key>
TURSO_DATABASE_URL=<your-turso-url>
TURSO_AUTH_TOKEN=<your-turso-token>
```

### Client (`.env.production`)
```
REACT_APP_API_URL=/api
```

### Admin (`.env.production`)
```
REACT_APP_API_URL=/api
PORT=3001
```

## Next Steps

- Set up CI/CD with GitHub Actions for automatic deployments
- Configure production domain and SSL
- Set up monitoring and error tracking (e.g., Sentry)
- Enable Vercel Analytics for performance monitoring
- Configure backup strategy for Turso database

## Support

For issues:
- Vercel: https://vercel.com/docs
- Turso: https://docs.turso.tech
- Project issues: Check deployment logs in Vercel dashboard
