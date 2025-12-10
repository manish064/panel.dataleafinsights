const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const surveyRoutes = require('./routes/surveys');
const userRoutes = require('./routes/users');

// Admin routes
const adminRoutes = require('./routes/admin');
const adminDashboardRoutes = require('./routes/adminDashboard');
const adminUsersRoutes = require('./routes/adminUsers');
const adminSurveysRoutes = require('./routes/adminSurveys');
const adminRewardsRoutes = require('./routes/adminRewards');
const adminAuditLogsRoutes = require('./routes/adminAuditLogs');
const adminSettingsRoutes = require('./routes/adminSettings');
const adminWithdrawalsRoutes = require('./routes/adminWithdrawals');

const { sequelize } = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: [
      // Production URLs (Render) - UPDATE THESE after deployment
      'https://dataleaf-client.onrender.com',
      'https://dataleaf-admin.onrender.com',
      // Development URLs
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
});
const PORT = process.env.PORT || 5000;

// Make io available globally for other modules
global.io = io;

// Trust proxy setting for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());
app.use(cors({
  origin: [
    // Production URLs (Render) - UPDATE THESE after deployment
    'https://dataleaf-client.onrender.com',
    'https://dataleaf-admin.onrender.com',
    // Development URLs
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting - Increased limits for survey application
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5000, // limit each IP to 5000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  }
});
app.use(limiter);

// Body parsing middleware with timeout handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request timeout middleware
app.use((req, res, next) => {
  // Set timeout for all requests (30 seconds)
  req.setTimeout(30000, () => {
    console.error(`Request timeout: ${req.method} ${req.url}`);
    if (!res.headersSent) {
      res.status(408).json({
        success: false,
        message: 'Request timeout',
        timestamp: new Date().toISOString()
      });
    }
  });

  // Set response timeout
  res.setTimeout(30000, () => {
    console.error(`Response timeout: ${req.method} ${req.url}`);
    if (!res.headersSent) {
      res.status(504).json({
        success: false,
        message: 'Response timeout',
        timestamp: new Date().toISOString()
      });
    }
  });

  next();
});

// Request/Response logging middleware
app.use((req, res, next) => {
  const startTime = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;

  // Add request ID to request object
  req.requestId = requestId;

  // Log incoming request
  console.log(`📥 REQUEST [${requestId}]: ${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    contentType: req.get('Content-Type'),
    timestamp: new Date().toISOString()
  });

  // Override res.json to log responses
  const originalJson = res.json;
  res.json = function (data) {
    const responseTime = Date.now() - startTime;
    console.log(`📤 RESPONSE [${requestId}]: ${res.statusCode} - ${responseTime}ms`, {
      success: data?.success,
      message: data?.message,
      timestamp: new Date().toISOString()
    });
    return originalJson.call(this, data);
  };

  next();
});

// API routes (for api.credencuesta-panel.com)
app.use('/auth', authRoutes);
app.use('/surveys', surveyRoutes);
app.use('/users', userRoutes);

// Admin API routes (for admin.credencuesta-panel.com)
app.use('/api/admin', adminRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/users', adminUsersRoutes);
app.use('/api/admin/surveys', adminSurveysRoutes);
app.use('/api/admin/rewards', adminRewardsRoutes);
app.use('/api/admin/audit-logs', adminAuditLogsRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/admin/withdrawals', adminWithdrawalsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync database models
    await sequelize.sync({ force: false });
    console.log('Database models synchronized.');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('Socket.io server initialized');
    });

    // Socket.io connection handling
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);

      // Join user to their personal room for targeted notifications
      socket.on('join-user-room', (userId) => {
        socket.join(`user-${userId}`);
        console.log(`User ${userId} joined their room`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
