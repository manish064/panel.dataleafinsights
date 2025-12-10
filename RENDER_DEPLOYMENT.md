# 🚀 Render Deployment Guide - DataLeaf Survey Panel

## Complete Step-by-Step Guide to Deploy on Render

---

## ✅ Pre-Deployment Checklist

- [x] Code updated with Render production URLs
- [x] CORS configured for Render domains
- [x] Environment files created
- [x] Render.yaml configs created
- [x] Git repository initialized
- [ ] Code pushed to GitHub
- [ ] Render account created

---

## 📋 Step 1: Push Code to GitHub

### 1.1 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `dataleaf-panel`
3. Description: "DataLeaf Survey Panel - Client, Admin & Server"
4. Make it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README
6. Click **"Create repository"**

### 1.2 Push Your Code

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dataleaf-panel.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🎯 Step 2: Deploy Server on Render

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended)
4. Authorize Render to access your repositories

### 2.2 Deploy Server (Web Service)

1. Click **"New +"** → **"Web Service"**
2. Click **"Connect a repository"**
3. Find and select **"dataleaf-panel"**
4. Click **"Connect"**

5. **Configure the service:**
   ```
   Name: dataleaf-api
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

6. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these:
   ```
   NODE_ENV = production
   PORT = 5000
   JWT_SECRET = [Click "Generate" button for random secret]
   ```

7. Click **"Create Web Service"**

8. ⏳ **Wait 2-3 minutes** for deployment

9. ✅ **Copy your server URL:**
   ```
   https://dataleaf-api.onrender.com
   ```
   (Your actual URL will be shown in the dashboard)

10. **Test the server:**
    - Visit: `https://dataleaf-api.onrender.com/health`
    - You should see: `{"status":"OK","timestamp":"..."}`

---

## 🎨 Step 3: Deploy Client on Render

### 3.1 Create Static Site

1. Click **"New +"** → **"Static Site"**
2. Select **"dataleaf-panel"** repository
3. Click **"Connect"**

4. **Configure the site:**
   ```
   Name: dataleaf-client
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

5. **Add Environment Variable:**
   Click **"Advanced"** → **"Add Environment Variable"**
   ```
   REACT_APP_API_URL = https://dataleaf-api.onrender.com
   ```
   (Use the actual server URL from Step 2)

6. Click **"Create Static Site"**

7. ⏳ **Wait 2-3 minutes** for deployment

8. ✅ **Copy your client URL:**
   ```
   https://dataleaf-client.onrender.com
   ```

9. **Test the client:**
   - Visit your client URL
   - You should see the DataLeaf homepage

---

## 👨‍💼 Step 4: Deploy Admin on Render

### 4.1 Create Static Site

1. Click **"New +"** → **"Static Site"**
2. Select **"dataleaf-panel"** repository
3. Click **"Connect"**

4. **Configure the site:**
   ```
   Name: dataleaf-admin
   Branch: main
   Root Directory: admin
   Build Command: npm install && npm run build
   Publish Directory: build
   ```

5. **Add Environment Variable:**
   Click **"Advanced"** → **"Add Environment Variable"**
   ```
   REACT_APP_API_URL = https://dataleaf-api.onrender.com
   ```
   (Use the same server URL from Step 2)

6. Click **"Create Static Site"**

7. ⏳ **Wait 2-3 minutes** for deployment

8. ✅ **Copy your admin URL:**
   ```
   https://dataleaf-admin.onrender.com
   ```

9. **Test the admin:**
   - Visit your admin URL
   - You should see the admin login page

---

## 🔄 Step 5: Update CORS with Actual URLs

Now that you have your actual Render URLs, update the server CORS:

### 5.1 Update server/index.js

Open `server/index.js` and update the CORS origins with your **actual URLs**:

```javascript
// Around line 29-37 (Socket.io CORS)
origin: [
  'https://dataleaf-client.onrender.com',  // Your actual client URL
  'https://dataleaf-admin.onrender.com',   // Your actual admin URL
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
],

// Around line 54-62 (Express CORS)
origin: [
  'https://dataleaf-client.onrender.com',  // Your actual client URL
  'https://dataleaf-admin.onrender.com',   // Your actual admin URL
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002'
],
```

### 5.2 Commit and Push

```bash
git add server/index.js
git commit -m "Update CORS with production Render URLs"
git push
```

### 5.3 Render Auto-Redeploys

- Render will automatically detect the push
- Server will redeploy in ~1-2 minutes
- ✅ CORS is now configured correctly!

---

## ✅ Step 6: Verify Everything Works

### 6.1 Test Client App

1. Visit: `https://dataleaf-client.onrender.com`
2. Try to **register** a new account
3. Check your email for OTP
4. Complete registration
5. Try to **login**
6. Check **Dashboard**
7. Check **Surveys** page
8. Check **Rewards** page

### 6.2 Test Admin App

1. Visit: `https://dataleaf-admin.onrender.com`
2. Login with admin credentials
3. Check **Dashboard**
4. Check **User Management**
5. Check **Survey Management**
6. Check **Withdrawals**

### 6.3 Test Real-Time Features

1. Login to client app
2. Keep it open
3. In admin, approve a survey or reward
4. Client should show real-time notification ✅

---

## 🎉 Deployment Complete!

Your apps are now live:

| App | URL | Status |
|-----|-----|--------|
| **Server API** | https://dataleaf-api.onrender.com | ✅ Live |
| **Client App** | https://dataleaf-client.onrender.com | ✅ Live |
| **Admin Panel** | https://dataleaf-admin.onrender.com | ✅ Live |

---

## 📝 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ✅ Server sleeps after 15 minutes of inactivity
- ✅ First request after sleep takes ~30 seconds to wake up
- ✅ 750 hours/month (enough for 1 app 24/7)
- ✅ Static sites never sleep

**Solutions for Sleep:**
1. Accept it (most users won't notice)
2. Use UptimeRobot to ping every 5 minutes (keeps awake)
3. Upgrade to $7/month for no sleep

### Auto-Deployment

- ✅ Every `git push` triggers auto-deployment
- ✅ Render builds and deploys automatically
- ✅ No manual intervention needed

### Environment Variables

- ✅ Set in Render Dashboard
- ✅ Can be updated anytime
- ✅ Requires redeploy after changes

---

## 🔧 Updating Your Apps

### To Update Code:

```bash
# Make your changes
git add .
git commit -m "Your changes"
git push

# Render auto-deploys!
```

### To Update Environment Variables:

1. Go to Render Dashboard
2. Select your service
3. Click **"Environment"**
4. Update variables
5. Click **"Save Changes"**
6. Service will auto-redeploy

---

## 🐛 Troubleshooting

### Server Returns 500 Error

- Check Render logs: Dashboard → Service → Logs
- Verify environment variables are set
- Check database is created

### CORS Error

- Verify CORS URLs in `server/index.js`
- Make sure you pushed the updated code
- Check Render deployment logs

### Client Can't Connect to Server

- Verify `REACT_APP_API_URL` is set correctly
- Check server is running (visit `/health`)
- Check browser console for errors

### Database Not Working

- SQLite works on Render (persistent disk)
- Database file created automatically
- Check server logs for errors

---

## 📊 Monitoring

### Render Dashboard

- View deployment logs
- Monitor resource usage
- See request metrics
- Check uptime

### Health Check

- Server: `https://dataleaf-api.onrender.com/health`
- Should return: `{"status":"OK"}`

---

## 🎯 Next Steps

1. ✅ Test all features thoroughly
2. ✅ Set up custom domains (optional)
3. ✅ Configure email service (optional)
4. ✅ Set up monitoring/alerts
5. ✅ Create database backups

---

## 🆘 Need Help?

- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Render Community:** [community.render.com](https://community.render.com)
- **Status Page:** [status.render.com](https://status.render.com)

---

**Congratulations! Your DataLeaf Survey Panel is now live on Render! 🎉**
