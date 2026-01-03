# Step-by-Step: Deploy to Vercel

## Step 1: Initialize Git & Commit Your Code

Run these commands in your terminal:

```bash
cd /Users/basamismaeel/skincare
git init
git add .
git commit -m "Initial commit - Skincare Advisor App"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in top right → **"New repository"**
3. Name it: `skincare-advisor` (or any name you like)
4. Make it **Public** or **Private** (your choice)
5. **DON'T** check "Initialize with README" (we already have files)
6. Click **"Create repository"**

## Step 3: Push to GitHub

After creating the repo, GitHub will show you commands. Run these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/skincare-advisor.git
git branch -M main
git push -u origin main
```

(Replace `YOUR_USERNAME` with your GitHub username)

## Step 4: Deploy to Vercel

### 4.1 Go to Vercel
- Visit [vercel.com](https://vercel.com)
- Click **"Sign Up"** or **"Log In"**
- Choose **"Continue with GitHub"** (easiest way)

### 4.2 Import Your Project
- After logging in, click **"Add New..."** → **"Project"**
- You'll see your GitHub repositories
- Find `skincare-advisor` and click **"Import"**

### 4.3 Configure Project
- **Framework Preset**: Should auto-detect "Next.js" ✅
- **Root Directory**: Leave as `./` ✅
- **Build Command**: `npm run build` (auto-filled) ✅
- **Output Directory**: `.next` (auto-filled) ✅
- **Install Command**: `npm install` (auto-filled) ✅

### 4.4 Add Environment Variables
Click **"Environment Variables"** and add these:

1. **DATABASE_URL**
   - Value: Your PostgreSQL connection string
   - Example: `postgresql://user:password@host:5432/database`

2. **NEXTAUTH_URL**
   - Value: Will be auto-filled after first deploy
   - Or use: `https://your-app-name.vercel.app`

3. **NEXTAUTH_SECRET**
   - Value: Your secret key (the one from .env file)
   - Example: `PNnt+S7au7cu+HR1rDUb/oIpyXjNL8PIJ2BDz5W0eOM=`

4. **GOOGLE_CLIENT_ID** (Optional)
   - Only if using Google sign-in

5. **GOOGLE_CLIENT_SECRET** (Optional)
   - Only if using Google sign-in

### 4.5 Deploy!
- Click **"Deploy"** button
- Wait 2-3 minutes for build to complete
- 🎉 Your app will be live!

## Step 5: Set Up Database (If Not Done)

You need a PostgreSQL database. Free options:

### Option A: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Sign up (free)
3. Create new project
4. Go to **Settings** → **Database**
5. Copy the **Connection String**
6. Update `DATABASE_URL` in Vercel

### Option B: Neon
1. Go to [neon.tech](https://neon.tech)
2. Sign up (free)
3. Create project
4. Copy connection string
5. Update in Vercel

## Step 6: Run Database Migrations

After first deploy, you need to set up the database:

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Functions**
3. Or use Vercel CLI:
   ```bash
   npm i -g vercel
   vercel login
   vercel link
   vercel env pull .env.local
   npm run db:push
   ```

Or manually run migrations in your database.

## Step 7: Share Your App! 🎉

Once deployed, Vercel gives you a URL like:
- `https://skincare-advisor.vercel.app`
- Or custom domain if you set one up

**Share this URL with anyone!**

---

## Troubleshooting

### Build Fails?
- Check Vercel build logs
- Make sure all environment variables are set
- Verify `package.json` has correct scripts

### Database Connection Error?
- Verify `DATABASE_URL` is correct in Vercel
- Make sure database allows connections from Vercel IPs
- Check database is running

### App Works Locally But Not on Vercel?
- Check environment variables match
- Verify database is accessible
- Check build logs for errors

---

## Quick Checklist

- [ ] Code committed to Git
- [ ] Pushed to GitHub
- [ ] Created Vercel account
- [ ] Imported project from GitHub
- [ ] Added all environment variables
- [ ] Deployed successfully
- [ ] Database set up and connected
- [ ] Tested the live app
- [ ] Shared the URL! 🚀

