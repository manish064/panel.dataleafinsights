module.exports = {
  apps: [{
    name: 'credencuesta-api',
    script: 'index.js',
    cwd: '/var/www/clone/server',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: '/var/log/pm2/credencuesta-api-error.log',
    out_file: '/var/log/pm2/credencuesta-api-out.log',
    log_file: '/var/log/pm2/credencuesta-api-combined.log',
    time: true,
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
