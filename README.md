# DataLeaf Survey Panel

A comprehensive survey panel application with client, admin, and server components.

## 🏗️ Project Structure

```
perfectclone/
├── client/          # User-facing React application
├── admin/           # Admin panel React application
├── server/          # Node.js/Express backend API
└── DEPLOYMENT.md    # Detailed deployment guide
```

## 🚀 Quick Start

### Development

1. **Install dependencies:**
```bash
# Install client dependencies
cd client
npm install

# Install admin dependencies
cd ../admin
npm install

# Install server dependencies
cd ../server
npm install
```

2. **Set up environment variables:**
```bash
# Client
cd client
copy .env.development.example .env.development

# Admin
cd ../admin
copy .env.development.example .env.development

# Server
cd ../server
copy .env.example .env
```

3. **Start development servers:**

```bash
# Terminal 1 - Start server
cd server
npm run dev

# Terminal 2 - Start client
cd client
npm start

# Terminal 3 - Start admin
cd admin
npm start
```

- Client: http://localhost:3000
- Admin: http://localhost:3001
- Server: http://localhost:5000

## 📦 Deployment

### Deploy to Vercel

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

**Quick Deploy:**

```bash
# Using PowerShell script
.\deploy-vercel.ps1

# Or manually with Vercel CLI
cd client
vercel --prod

cd ../admin
vercel --prod

cd ../server
vercel --prod
```

### ⚠️ Important: Database Considerations

The current setup uses **SQLite**, which is **not compatible** with Vercel's serverless architecture.

**Recommended Solutions:**

1. **Deploy server on Railway/Render** (supports SQLite)
2. **Migrate to PostgreSQL** (use Vercel Postgres, Supabase, or PlanetScale)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🛠️ Tech Stack

### Frontend (Client & Admin)
- React 19
- React Router v7
- TailwindCSS
- Socket.io Client
- Axios
- React Toastify

### Backend (Server)
- Node.js
- Express
- Sequelize ORM
- SQLite (development)
- Socket.io
- JWT Authentication
- Passport (Google OAuth)

## 📁 Key Features

### Client App
- User authentication (email/password + Google OAuth)
- Survey participation
- Rewards management
- Payment history
- Real-time notifications

### Admin App
- User management
- Survey management
- Rewards management
- Withdrawal requests
- Analytics dashboard
- Audit logs

### Server
- RESTful API
- WebSocket support
- JWT authentication
- Rate limiting
- Security middleware (Helmet, CORS)
- Email notifications

## 🔐 Environment Variables

### Client & Admin
- `REACT_APP_API_URL` - Backend API URL

### Server
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - JWT signing secret
- `DATABASE_URL` - Database connection string (for production)

See `.env.production.example` files for complete list.

## 📖 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete deployment instructions
- [API Documentation](./server/README.md) - API endpoints and usage (if available)

## 🆘 Support

For deployment issues or questions, refer to:
- [DEPLOYMENT.md](./DEPLOYMENT.md)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)

## 📄 License

ISC

---

**Built with ❤️ for DataLeaf**
