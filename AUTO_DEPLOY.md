# 🚀 Auto-Deploy to Vercel - Setup Guide

## ✅ How It Works

When you push code to GitHub → Vercel automatically deploys!

---

## 📋 Step 1: Connect GitHub to Vercel (One-Time Setup)

### Option A: If Vercel is NOT connected to GitHub yet

1. **Go to Vercel**: https://vercel.com/dashboard
2. **Click your project**: "dermalyze-one"
3. **Settings** → **Git**
4. **Connect Git Repository**
5. **Select**: "GitHub"
6. **Choose repository**: `Basamismaeel/Dermalyze`
7. **Click**: "Connect"
8. **Select branch**: `main`
9. **Click**: "Deploy"

### Option B: If already connected

✅ You're all set! Just push to GitHub and it will auto-deploy.

---

## 🔄 Step 2: Workflow (Every Time You Make Changes)

### 1. Make your changes locally
```bash
# Edit files in your code editor
```

### 2. Commit changes
```bash
git add .
git commit -m "Your change description"
```

### 3. Push to GitHub
```bash
git push origin main
```

### 4. Vercel automatically deploys! 🎉

- Go to: https://vercel.com/dashboard
- Click: "dermalyze-one"
- Watch the deployment happen automatically
- Takes 2-3 minutes
- Your site updates automatically!

---

## 📊 Check Deployment Status

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **Click**: "dermalyze-one"
3. **Deployments** tab
4. See all your deployments with status:
   - ✅ Ready (deployed successfully)
   - 🔄 Building (in progress)
   - ❌ Error (check logs)

---

## 🎯 Quick Commands

```bash
# Make changes, then:
git add .
git commit -m "Update feature"
git push origin main

# That's it! Vercel deploys automatically
```

---

## 🔍 Verify Auto-Deploy is Working

1. Make a small change (like adding a comment)
2. Push to GitHub
3. Check Vercel dashboard
4. You should see a new deployment starting automatically

---

## ⚙️ Vercel Settings to Check

**Settings** → **Git**:
- ✅ Production Branch: `main`
- ✅ Auto-deploy: Enabled

**Settings** → **Deployments**:
- ✅ Automatic deployments from Git: Enabled

---

## 🆘 Troubleshooting

### Changes not deploying?

1. **Check Git connection**:
   - Vercel → Settings → Git
   - Make sure GitHub is connected

2. **Check branch**:
   - Make sure you're pushing to `main` branch
   - Vercel should be set to deploy from `main`

3. **Check Vercel logs**:
   - Vercel → Deployments
   - Click latest deployment
   - Check for errors

### Want to deploy manually?

1. Vercel → Deployments
2. Click "..." on any deployment
3. Click "Redeploy"

---

## 💡 Pro Tips

1. **Preview Deployments**: 
   - Push to a different branch → Vercel creates a preview URL
   - Perfect for testing before merging to main

2. **Deployment Hooks**:
   - Vercel can notify you when deployments finish
   - Settings → Notifications

3. **Build Logs**:
   - Always check logs if deployment fails
   - Vercel → Deployments → Click deployment → Logs

---

**That's it! Now every push to GitHub = automatic Vercel deployment! 🎉**


