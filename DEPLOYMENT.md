# DataLeaf Survey Panel - Vercel Deployment Guide

## 🚀 Complete Deployment Guide for Vercel

This guide will help you deploy your DataLeaf application (Client, Admin, and Server) to Vercel.

---

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Important Notes](#important-notes)
3. [Deployment Steps](#deployment-steps)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ A [Vercel account](https://vercel.com/signup)
- ✅ [Git](https://git-scm.com/) installed
- ✅ [Vercel CLI](https://vercel.com/cli) installed: `npm install -g vercel`
- ✅ A GitHub/GitLab/Bitbucket account (optional but recommended)

---

## ⚠️ Important Notes

### **Database Limitation**
Your current setup uses **SQLite**, which **will NOT work on Vercel** because:
- Vercel uses serverless functions (stateless)
- SQLite requires a persistent file system
- Each request might hit a different server instance

### **Solutions:**

**Option A: Use a Cloud Database (Recommended)**
- **Vercel Postgres** (easiest integration)
- **Supabase** (PostgreSQL with free tier)
- **PlanetScale** (MySQL-compatible)
- **Railway** (PostgreSQL with free tier)

**Option B: Deploy Backend Elsewhere**
- Deploy server on **Railway**, **Render**, or **Heroku**
- Keep SQLite for development
- Deploy only client and admin on Vercel

---

## 🚀 Deployment Steps

### **Method 1: Deploy via Vercel Dashboard (Easiest)**

#### **Step 1: Push to Git Repository**

```bash
# Navigate to your project root
cd c:\Users\hp\Desktop\ADMINCLIENTPANELDEMO\perfectclone

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit for Vercel deployment"

# Create a repository on GitHub and push
git remote add origin https://github.com/yourusername/dataleaf-panel.git
git branch -M main
git push -u origin main
```

#### **Step 2: Deploy Client App**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your repository
4. Configure project:
   - **Project Name**: `dataleaf-client`
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variables:
   - `REACT_APP_API_URL` = (leave empty for now, update after server deployment)
6. Click **"Deploy"**

#### **Step 3: Deploy Admin App**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the **same repository**
3. Configure project:
   - **Project Name**: `dataleaf-admin`
   - **Framework Preset**: Create React App
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variables:
   - `REACT_APP_API_URL` = (leave empty for now, update after server deployment)
5. Click **"Deploy"**

#### **Step 4: Deploy Server (If Using Cloud Database)**

**⚠️ IMPORTANT:** First migrate from SQLite to PostgreSQL/MySQL

1. Set up a cloud database (e.g., Vercel Postgres)
2. Update `server/models/index.js` to use the new database
3. Go to [vercel.com/new](https://vercel.com/new)
4. Import the **same repository**
5. Configure project:
   - **Project Name**: `dataleaf-api`
   - **Framework Preset**: Other
   - **Root Directory**: `server`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = (generate a secure random string)
   - `DATABASE_URL` = (your database connection string)
   - Add other variables from `.env.production.example`
7. Click **"Deploy"**

---

### **Method 2: Deploy via Vercel CLI**

#### **Deploy Client**

```bash
cd client
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? dataleaf-client
# - In which directory is your code located? ./
# - Want to override settings? No

# After deployment, set environment variables
vercel env add REACT_APP_API_URL production

# Deploy to production
vercel --prod
```

#### **Deploy Admin**

```bash
cd ../admin
vercel

# Follow prompts:
# - Project name? dataleaf-admin
# - Set environment variables
vercel env add REACT_APP_API_URL production

# Deploy to production
vercel --prod
```

#### **Deploy Server**

```bash
cd ../server
vercel

# Follow prompts:
# - Project name? dataleaf-api
# - Set all environment variables
vercel env add NODE_ENV production
vercel env add JWT_SECRET production
vercel env add DATABASE_URL production

# Deploy to production
vercel --prod
```

---

## 🔐 Environment Variables

### **Client App**

Add these in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-api.vercel.app` | Backend API URL |

### **Admin App**

| Variable | Value | Description |
|----------|-------|-------------|
| `REACT_APP_API_URL` | `https://your-api.vercel.app` | Backend API URL |

### **Server App**

| Variable | Value | Description |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Environment |
| `JWT_SECRET` | `your-secret-key` | JWT signing key |
| `DATABASE_URL` | `postgresql://...` | Database connection |
| `PORT` | `5000` | Server port |

---

## 📝 Post-Deployment

### **1. Update API URLs**

After deploying the server, update the `REACT_APP_API_URL` in both client and admin apps:

```bash
# For client
vercel env rm REACT_APP_API_URL production
vercel env add REACT_APP_API_URL production
# Enter: https://your-server-app.vercel.app

# Redeploy
vercel --prod

# Repeat for admin
```

### **2. Update CORS Settings**

Update `server/index.js` to include your Vercel URLs:

```javascript
origin: [
  'https://your-client-app.vercel.app',
  'https://your-admin-app.vercel.app',
  // ... other origins
]
```

Then redeploy the server:

```bash
cd server
vercel --prod
```

### **3. Set Up Custom Domains (Optional)**

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domains:
   - Client: `app.yourdomain.com`
   - Admin: `admin.yourdomain.com`
   - Server: `api.yourdomain.com`

---

## 🐛 Troubleshooting

### **Build Fails**

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### **API Connection Issues**

- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings in server
- Ensure server is deployed and running

### **Database Errors**

- SQLite won't work on Vercel serverless
- Migrate to PostgreSQL/MySQL
- Use Vercel Postgres or external database

### **Environment Variables Not Working**

- Ensure variables are prefixed with `REACT_APP_` for React apps
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)

---

## 🎯 Recommended Deployment Strategy

### **Best Approach:**

1. **Deploy Server on Railway/Render** (supports SQLite or PostgreSQL)
   - Railway: [railway.app](https://railway.app)
   - Render: [render.com](https://render.com)
   - Both have free tiers and support persistent databases

2. **Deploy Client & Admin on Vercel**
   - Fast CDN delivery
   - Automatic HTTPS
   - Easy custom domains

### **Why This Approach?**

- ✅ Keep your SQLite database (or easily upgrade to PostgreSQL)
- ✅ Persistent file system for uploads
- ✅ WebSocket support (Socket.io)
- ✅ Better for stateful backend
- ✅ Free tier available on both platforms

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Review environment variables
3. Verify database connection
4. Check CORS settings

---

**Good luck with your deployment! 🚀**
