# DataLeaf Vercel Deployment - Quick Start Script
# Run this script to deploy all apps to Vercel

Write-Host "🚀 DataLeaf Vercel Deployment Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking for Vercel CLI..." -ForegroundColor Yellow
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Red
    npm install -g vercel
} else {
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
}

Write-Host ""
Write-Host "⚠️  IMPORTANT NOTES:" -ForegroundColor Yellow
Write-Host "1. Your server uses SQLite which won't work on Vercel serverless" -ForegroundColor Yellow
Write-Host "2. Consider deploying the server on Railway or Render instead" -ForegroundColor Yellow
Write-Host "3. You'll need to update API URLs after deployment" -ForegroundColor Yellow
Write-Host ""

$continue = Read-Host "Do you want to continue? (y/n)"
if ($continue -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "📦 Step 1: Deploying Client App..." -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Set-Location -Path "client"
vercel --prod
Set-Location -Path ".."

Write-Host ""
Write-Host "📦 Step 2: Deploying Admin App..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Set-Location -Path "admin"
vercel --prod
Set-Location -Path ".."

Write-Host ""
$deployServer = Read-Host "Do you want to deploy the server to Vercel? (y/n) [Not recommended due to SQLite]"
if ($deployServer -eq "y") {
    Write-Host ""
    Write-Host "📦 Step 3: Deploying Server..." -ForegroundColor Cyan
    Write-Host "==============================" -ForegroundColor Cyan
    Set-Location -Path "server"
    vercel --prod
    Set-Location -Path ".."
}

Write-Host ""
Write-Host "✅ Deployment Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Copy the deployment URLs from above" -ForegroundColor White
Write-Host "2. Update REACT_APP_API_URL in client and admin apps" -ForegroundColor White
Write-Host "3. Update CORS settings in server with new frontend URLs" -ForegroundColor White
Write-Host "4. Redeploy all apps after updating environment variables" -ForegroundColor White
Write-Host ""
Write-Host "📖 For detailed instructions, see DEPLOYMENT.md" -ForegroundColor Cyan
