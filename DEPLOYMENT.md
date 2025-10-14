# 🚀 Deployment Guide - Modern Retro Cyber

## 🌍 Live Deployments

### 🎮 Main Application (Web)
**URL**: `https://modern-retro-cyber.vercel.app`
**Status**: 🚧 Ready for deployment
**Features**: TokenMinerGame, Web3 integration, Interactive UI

### 📊 Admin Dashboard  
**URL**: `https://modern-retro-cyber-admin.vercel.app`
**Status**: 🚧 Ready for deployment
**Features**: Analytics, Player management, System monitoring

---

## 🔧 Vercel Deployment Setup

### Step 1: Import GitHub Repository

1. **Go to Vercel Dashboard**: [https://vercel.com/new](https://vercel.com/new)
2. **Import Git Repository**: Select `Gzeu/modern-retro-cyber`
3. **Configure Project Settings**:

#### Web Application Settings
```bash
Project Name: modern-retro-cyber
Framework: Other
Root Directory: apps/web
Build Command: cd ../.. && pnpm install && pnpm build && cd apps/web
Output Directory: build/client
Install Command: cd ../.. && pnpm install
Node.js Version: 20.x
```

#### Admin Dashboard Settings
```bash
Project Name: modern-retro-cyber-admin  
Framework: Other
Root Directory: apps/admin
Build Command: cd ../.. && pnpm install && pnpm build && cd apps/admin
Output Directory: build/client
Install Command: cd ../.. && pnpm install
Node.js Version: 20.x
```

### Step 2: Environment Variables

Add these environment variables in Vercel Dashboard:

```bash
# Required for monorepo builds
TURBO_TELEMETRY_DISABLED=1
NODE_ENV=production

# Optional: Turborepo Remote Cache
TURBO_TOKEN=your_turbo_token_here
TURBO_TEAM=modern-retro-cyber

# Web3 Configuration (for future smart contract integration)
NEXT_PUBLIC_NETWORK_ID=11155111
NEXT_PUBLIC_CHAIN_NAME=sepolia
```

### Step 3: Deploy

1. **Click Deploy** - Vercel will automatically build and deploy
2. **Wait for Build** - Initial build takes ~2-3 minutes
3. **Verify Deployment** - Check live URLs work correctly
4. **Enable Auto-Deploy** - Future pushes to `main` auto-deploy

---

## 🔄 Automated Deployment via CLI

### Install Vercel CLI
```bash
npm i -g vercel
```

### Deploy Web App
```bash
# Navigate to web app
cd apps/web

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod

# Follow prompts to configure project
```

### Deploy Admin Dashboard
```bash
# Navigate to admin app
cd apps/admin

# Deploy to production
vercel --prod
```

---

## 🌍 Domain Configuration

### Custom Domains Setup

1. **Purchase domains** (recommended):
   - `modern-retro-cyber.dev` (main app)
   - `admin.modern-retro-cyber.dev` (admin dashboard)

2. **Add domains in Vercel**:
   - Go to Project Settings → Domains
   - Add custom domain
   - Configure DNS (automatic with Vercel nameservers)

3. **SSL Certificates**:
   - Automatically provisioned by Vercel
   - HTTPS enforced by default

---

## 📈 Performance Optimization

### Vercel Edge Network
- **Global CDN**: 100+ edge locations worldwide
- **Static asset caching**: Automatic optimization
- **Image optimization**: Next.js Image component ready
- **Edge functions**: For dynamic content when needed

### Build Performance
```bash
# Turborepo Remote Cache (speeds up CI/CD)
export TURBO_TOKEN="your_token_here"
export TURBO_TEAM="modern-retro-cyber"

# Enable in GitHub Actions for 90% faster builds
```

### Bundle Analysis
```bash
# Analyze bundle sizes locally
pnpm --filter web analyze

# View bundle analyzer
open apps/web/.next/analyze/client.html
```

---

## 🔍 Monitoring & Debugging

### Vercel Analytics
- **Web Vitals**: Core performance metrics
- **Real User Monitoring**: Actual user experience data
- **Error tracking**: Runtime error alerts
- **Function logs**: Serverless function debugging

### Health Checks
```bash
# Check deployment status
curl https://modern-retro-cyber.vercel.app/api/health

# Expected response:
{
  "status": "healthy",
  "version": "0.1.0",
  "timestamp": "2025-01-14T10:30:00Z"
}
```

---

## ⚙️ Advanced Configuration

### Custom Build Pipeline

For complex deployments, use GitHub Actions + Vercel:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./apps/web
```

### Database Integration

For future database needs:

```bash
# Environment variables for database
DATABASE_URL=your_database_connection_string
REDIS_URL=your_redis_connection_string

# Vercel KV (Redis)
# Vercel Postgres
# PlanetScale MySQL
```

---

## 🔒 Security Configuration

### Headers Security
```json
// vercel.json security headers
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

### Environment Variables Security
- Use Vercel Dashboard for sensitive variables
- Never commit `.env` files
- Rotate keys regularly
- Use Vercel's encrypted storage

---

## 📦 Deployment Checklist

### Pre-deployment
- [ ] All tests passing
- [ ] Build successful locally
- [ ] Environment variables configured
- [ ] Domain/SSL configured
- [ ] Performance tested

### Post-deployment
- [ ] Live URLs working
- [ ] Web3 functionality tested
- [ ] Mobile responsiveness verified
- [ ] Performance metrics checked
- [ ] Error monitoring enabled

### Production Ready
- [ ] Custom domain configured
- [ ] Analytics setup complete
- [ ] Monitoring alerts configured
- [ ] Backup/rollback plan ready
- [ ] Team access configured

---

## 🎆 Success Metrics

### Target Performance
- **Build Time**: < 2 minutes
- **Page Load**: < 2 seconds
- **Lighthouse Score**: > 95/100  
- **Uptime**: 99.9%

### Monitoring Tools
- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and alerting
- **Uptime Robot**: Service availability monitoring
- **Google Analytics**: User behavior tracking

---

## 🔗 Quick Links

- **[Vercel Dashboard](https://vercel.com/dashboard)** - Project management
- **[Vercel Documentation](https://vercel.com/docs)** - Official guides
- **[Turborepo Vercel Guide](https://vercel.com/docs/monorepos/turborepo)** - Monorepo best practices
- **[Remix Vercel Guide](https://vercel.com/docs/frameworks/full-stack/remix)** - Remix deployment

---

**🎉 Ready to deploy! Your Modern Retro Cyber project is configured for production-grade deployment on Vercel with zero-downtime updates and global edge distribution.**