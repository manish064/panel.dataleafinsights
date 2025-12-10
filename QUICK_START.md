# 🎯 Quick Deployment Guide - TL;DR

## ⚠️ CRITICAL WARNING

**Your server uses SQLite database which WILL NOT WORK on Vercel!**

Vercel uses serverless functions (stateless), but SQLite needs a persistent file system.

## 🎯 Recommended Solution

### **Best Approach: Hybrid Deployment**

1. **Deploy Server on Railway** (Free tier, supports SQLite)
   - Visit: https://railway.app
   - Connect GitHub repo
   - Select `server` folder
   - Add environment variables
   - Deploy ✅

2. **Deploy Client on Vercel**
   - Visit: https://vercel.com
   - Import Git repo
   - Root directory: `client`
   - Add `REACT_APP_API_URL` = Railway server URL
   - Deploy ✅

3. **Deploy Admin on Vercel**
   - Import same repo
   - Root directory: `admin`
   - Add `REACT_APP_API_URL` = Railway server URL
   - Deploy ✅

---

## 🚀 Alternative: All on Vercel (Requires Database Migration)

### Prerequisites
- Migrate from SQLite to PostgreSQL
- Use Vercel Postgres or Supabase

### Steps
1. Set up PostgreSQL database
2. Update `server/models/index.js` for PostgreSQL
3. Deploy all three apps to Vercel

---

## 📦 Files Created for You

I've created these files to help with deployment:

| File | Purpose |
|------|---------|
| `DEPLOYMENT.md` | Complete step-by-step guide |
| `DEPLOYMENT_CHECKLIST.md` | Checklist to track progress |
| `README.md` | Project overview |
| `deploy-vercel.ps1` | Automated deployment script |
| `.gitignore` | Git ignore rules |
| `client/vercel.json` | Client Vercel config |
| `admin/vercel.json` | Admin Vercel config |
| `server/vercel.json` | Server Vercel config |
| `*/.env.production.example` | Environment variable templates |

---

## ⚡ Quick Start Commands

### Option 1: Railway (Server) + Vercel (Client & Admin)

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dataleaf.git
git push -u origin main

# 2. Deploy server on Railway
# Go to railway.app → New Project → Deploy from GitHub → Select repo → Select 'server' folder

# 3. Deploy client on Vercel
cd client
vercel --prod

# 4. Deploy admin on Vercel
cd ../admin
vercel --prod
```

### Option 2: All on Vercel (After DB Migration)

```bash
# Run the automated script
.\deploy-vercel.ps1
```

---

## 🔑 Environment Variables You'll Need

### Client & Admin
- `REACT_APP_API_URL` - Your server URL (from Railway or Vercel)

### Server
- `NODE_ENV` - `production`
- `JWT_SECRET` - Random secure string
- `DATABASE_URL` - PostgreSQL connection string (if using PostgreSQL)
- `PORT` - `5000`

---

## 📋 Deployment Order

1. **Server First** → Get the API URL
2. **Client Second** → Use API URL in env vars
3. **Admin Third** → Use API URL in env vars
4. **Update CORS** → Add client & admin URLs to server
5. **Redeploy Server** → With updated CORS settings

---

## 🎓 Learning Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Detailed Guide**: See `DEPLOYMENT.md`
- **Checklist**: See `DEPLOYMENT_CHECKLIST.md`

---

## 🆘 Common Issues

### "Build Failed"
- Check build logs
- Verify `package.json` dependencies
- Ensure Node version compatibility

### "Cannot connect to API"
- Check `REACT_APP_API_URL` is correct
- Verify server is running
- Check CORS settings

### "Database Error"
- SQLite won't work on Vercel serverless
- Use Railway for server OR migrate to PostgreSQL

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ All three apps are accessible via HTTPS
- ✅ Users can register and login
- ✅ Surveys display correctly
- ✅ Admin panel works
- ✅ Real-time features work

---

## 🎉 Next Steps After Deployment

1. Test all features thoroughly
2. Set up custom domains (optional)
3. Configure email service
4. Set up monitoring/analytics
5. Create backups of database

---

**Need detailed instructions? Read `DEPLOYMENT.md`**

**Want a step-by-step checklist? Use `DEPLOYMENT_CHECKLIST.md`**

**Ready to deploy? Run `.\deploy-vercel.ps1`**
