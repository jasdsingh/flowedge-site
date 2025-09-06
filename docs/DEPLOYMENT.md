# Railway Deployment Guide

## Overview
FlowEdge site uses Railway for hosting with automatic deployments from GitHub branches.

## Environments

### Production
- **URL**: https://flowedgeintel.com
- **Branch**: `main`
- **Auto-deploy**: Yes
- **Purpose**: Live site for users

### Staging
- **URL**: https://staging-flowedge.railway.app (or custom domain)
- **Branch**: `develop`
- **Auto-deploy**: Yes
- **Purpose**: Testing and preview

## Setting Up Railway Environments

### Step 1: Create Railway Project
1. Log in to [Railway](https://railway.app)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select `jasdsingh/flowedge-site`
5. Railway creates first environment automatically

### Step 2: Configure Production (main)
1. Go to Settings → Environment
2. Set environment name: "production"
3. Set deploy branch: `main`
4. Add custom domain:
   ```
   Domain: flowedgeintel.com
   Add CNAME record: xxx.railway.app
   ```

### Step 3: Create Staging Environment
1. Click "New Environment" in Railway
2. Name it "staging"
3. Configure:
   ```yaml
   Branch: develop
   Auto-deploy: Enabled
   Domain: staging-flowedge.railway.app
   ```

### Step 4: Environment Variables (if needed)
```bash
# Production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.flowedgeintel.com

# Staging
NODE_ENV=staging
NEXT_PUBLIC_API_URL=https://staging-api.flowedgeintel.com
```

## Deployment Workflow

### Daily Development
```bash
# Always work in develop
git checkout develop
git add .
git commit -m "Feature: Add trading journal"
git push origin develop

# Auto-deploys to staging
# Test at: staging-flowedge.railway.app
```

### Release to Production
```bash
# After testing on staging
git checkout main
git merge develop --no-ff -m "Release: v1.1.0"
git tag -a v1.1.0 -m "Trading journal feature"
git push origin main --tags

# Auto-deploys to production
# Live at: flowedgeintel.com
```

### Hotfix Process
```bash
# For critical bugs only
git checkout main
git checkout -b hotfix/fix-critical-bug

# Make fixes
git add .
git commit -m "Hotfix: Fix critical bug"

# Deploy to production
git checkout main
git merge hotfix/fix-critical-bug --no-ff
git push origin main

# Also merge to develop
git checkout develop
git merge hotfix/fix-critical-bug
git push origin develop

# Clean up
git branch -d hotfix/fix-critical-bug
```

## Railway Commands

### View Deployment Status
1. Go to Railway dashboard
2. Click on environment (production/staging)
3. View deployment logs

### Rollback Deployment
1. Go to deployments history
2. Find last working deployment
3. Click "Redeploy"

### Manual Deploy
```bash
# Railway CLI (optional)
npm install -g @railway/cli
railway login
railway up
```

## Monitoring

### Check Deployment Status
- Green check: Deployment successful
- Red X: Deployment failed
- Yellow circle: Deploying

### View Logs
1. Click on service
2. Go to "Logs" tab
3. Filter by:
   - Deploy logs
   - Runtime logs
   - Error logs

### Set Up Notifications
1. Go to Settings → Notifications
2. Add webhook or email
3. Configure for:
   - Deployment success
   - Deployment failure
   - Service crashes

## Troubleshooting

### Deployment Fails
```bash
# Check Railway logs
# Common issues:
- Build errors: Check package.json scripts
- Missing dependencies: Verify node_modules
- Environment variables: Check Railway settings
```

### Site Not Updating
```bash
# Verify branch is pushed
git push origin develop

# Check Railway dashboard
- Is auto-deploy enabled?
- Check deployment queue
- View build logs
```

### Domain Not Working
```bash
# Verify DNS settings
- CNAME points to Railway URL
- SSL certificate generated
- Wait 24-48 hours for propagation
```

## Quick Commands Reference

```bash
# Development workflow
git checkout develop        # Switch to develop
npm run dev                 # Local development
git add . && git commit     # Commit changes
git push origin develop     # Deploy to staging

# Release workflow
git checkout main          # Switch to main
git merge develop --no-ff  # Merge from develop
git tag -a v1.0.0          # Tag release
git push origin main --tags # Deploy to production

# Check status
git branch                 # Current branch
git status                # Changed files
git log --oneline -5      # Recent commits
```

## Best Practices

1. **Always test on staging first**
2. **Use semantic versioning** (v1.0.0, v1.1.0, v2.0.0)
3. **Write clear commit messages**
4. **Tag production releases**
5. **Monitor deployments** after pushing
6. **Keep environments in sync** (merge hotfixes to develop)

## Emergency Procedures

### Rollback Production
```bash
# Option 1: Railway Dashboard
# Click "Redeploy" on last working version

# Option 2: Git Revert
git checkout main
git revert HEAD
git push origin main
```

### Take Site Offline
```bash
# Create maintenance page
echo "<h1>Under Maintenance</h1>" > index.html
git add . && git commit -m "Maintenance mode"
git push origin main
```

## Support

- Railway Documentation: https://docs.railway.app
- Railway Status: https://status.railway.app
- GitHub Actions: Can be added for additional CI/CD