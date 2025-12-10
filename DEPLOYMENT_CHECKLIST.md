# Vercel Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## 📋 Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All code is committed to Git
- [ ] `.gitignore` is properly configured
- [ ] No sensitive data in code (API keys, passwords, etc.)
- [ ] All dependencies are listed in `package.json`
- [ ] Build scripts are working locally

### ✅ Environment Setup
- [ ] Vercel account created
- [ ] Vercel CLI installed (`npm install -g vercel`)
- [ ] Git repository created (GitHub/GitLab/Bitbucket)
- [ ] Code pushed to remote repository

### ✅ Database Decision
- [ ] **CRITICAL:** Decided on database solution
  - [ ] Option A: Migrate to PostgreSQL/MySQL
  - [ ] Option B: Deploy server on Railway/Render (keep SQLite)
  - [ ] Option C: Use Vercel Postgres

### ✅ Configuration Files
- [ ] `vercel.json` created for client
- [ ] `vercel.json` created for admin
- [ ] `vercel.json` created for server
- [ ] Environment variable templates created

---

## 🚀 Deployment Steps

### Step 1: Deploy Server First
- [ ] Choose deployment platform:
  - [ ] Vercel (requires database migration)
  - [ ] Railway (recommended, supports SQLite)
  - [ ] Render (supports SQLite)
- [ ] Set up database (if needed)
- [ ] Configure environment variables
- [ ] Deploy server
- [ ] Test server endpoint (visit `/health`)
- [ ] **Copy server URL** (you'll need this!)

**Server URL:** `_________________________________`

### Step 2: Deploy Client App
- [ ] Update `REACT_APP_API_URL` with server URL
- [ ] Deploy to Vercel
- [ ] Test deployment
- [ ] **Copy client URL**

**Client URL:** `_________________________________`

### Step 3: Deploy Admin App
- [ ] Update `REACT_APP_API_URL` with server URL
- [ ] Deploy to Vercel
- [ ] Test deployment
- [ ] **Copy admin URL**

**Admin URL:** `_________________________________`

---

## 🔧 Post-Deployment Configuration

### Update CORS Settings
- [ ] Add client URL to server CORS settings
- [ ] Add admin URL to server CORS settings
- [ ] Redeploy server with updated CORS

### Update Socket.io Settings
- [ ] Add client URL to Socket.io CORS
- [ ] Add admin URL to Socket.io CORS
- [ ] Test real-time features

### Environment Variables
- [ ] All environment variables set in Vercel dashboard
- [ ] `REACT_APP_API_URL` correct in client
- [ ] `REACT_APP_API_URL` correct in admin
- [ ] `JWT_SECRET` set in server
- [ ] Database connection string set (if applicable)

---

## ✅ Testing Checklist

### Client App Testing
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Google OAuth works (if configured)
- [ ] Dashboard displays correctly
- [ ] Surveys load
- [ ] Rewards page works
- [ ] Profile page works
- [ ] Payment history displays

### Admin App Testing
- [ ] Admin login works
- [ ] Dashboard displays stats
- [ ] User management works
- [ ] Survey management works
- [ ] Rewards management works
- [ ] Withdrawal requests display
- [ ] Audit logs work

### Server Testing
- [ ] `/health` endpoint responds
- [ ] Authentication endpoints work
- [ ] API endpoints respond correctly
- [ ] Database queries work
- [ ] Real-time notifications work
- [ ] Email sending works (if configured)

---

## 🐛 Troubleshooting

### Build Errors
- [ ] Check build logs in Vercel
- [ ] Verify all dependencies installed
- [ ] Check Node version compatibility
- [ ] Review error messages

### Runtime Errors
- [ ] Check function logs in Vercel
- [ ] Verify environment variables
- [ ] Check API connectivity
- [ ] Review CORS settings

### Database Errors
- [ ] Verify database connection string
- [ ] Check database is accessible
- [ ] Review migration status
- [ ] Check database credentials

---

## 🎯 Optional Enhancements

### Custom Domains
- [ ] Purchase domain (if needed)
- [ ] Add domain to Vercel project
- [ ] Configure DNS settings
- [ ] Wait for SSL certificate
- [ ] Update environment variables with new domains

### Performance Optimization
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable compression

### Security
- [ ] Enable HTTPS only
- [ ] Set secure headers
- [ ] Configure rate limiting
- [ ] Set up DDoS protection
- [ ] Review authentication flow

---

## 📝 Deployment URLs

Record your deployment URLs here for easy reference:

| Application | Development | Production | Custom Domain |
|-------------|-------------|------------|---------------|
| **Client**  | http://localhost:3000 | | |
| **Admin**   | http://localhost:3001 | | |
| **Server**  | http://localhost:5000 | | |

---

## 🔄 Redeployment Process

When you need to redeploy:

### For Code Changes
```bash
# Commit changes
git add .
git commit -m "Your changes"
git push

# Vercel will auto-deploy on push (if connected to Git)
# Or manually:
vercel --prod
```

### For Environment Variable Changes
1. Update in Vercel Dashboard
2. Trigger redeploy (or wait for auto-deploy)

---

## 📞 Support Resources

- [ ] Bookmark [Vercel Documentation](https://vercel.com/docs)
- [ ] Join [Vercel Discord](https://vercel.com/discord)
- [ ] Review [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ ] Check [Vercel Status](https://www.vercel-status.com/)

---

## ✨ Deployment Complete!

Once all items are checked:
- [ ] All apps deployed successfully
- [ ] All features tested and working
- [ ] URLs documented
- [ ] Team notified
- [ ] Documentation updated

**Congratulations! Your DataLeaf application is live! 🎉**

---

**Deployment Date:** `_________________`

**Deployed By:** `_________________`

**Notes:**
```
_____________________________________________
_____________________________________________
_____________________________________________
```
