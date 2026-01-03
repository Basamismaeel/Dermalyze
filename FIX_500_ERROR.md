# 🔧 Fix 500 Error on Vercel

Your app is deployed but crashing. Here's how to fix it:

---

## Step 1: Add Environment Variables (2 minutes)

1. Go to your Vercel project dashboard
2. Click **"Settings"** tab
3. Click **"Environment Variables"** (left sidebar)
4. **Add these 3 variables**:

### Required Variables:

1. **NEXTAUTH_URL**
   - Value: Your Vercel URL
   - Example: `https://dermalyze.vercel.app`
   - Or: `https://dermalyze-basamismaeel.vercel.app`
   - (Check your deployment URL)

2. **NEXTAUTH_SECRET**
   - Value: `PNnt+S7au7cu+HR1rDUb/oIpyXjNL8PIJ2BDz5W0eOM=`
   - (From your .env file)

3. **DATABASE_URL**
   - Value: Get from Supabase (see Step 2)
   - Format: `postgresql://user:password@host:5432/database`

5. **After adding all 3**, go to **"Deployments"** tab
6. Click **"..."** (three dots) on latest deployment
7. Click **"Redeploy"**

---

## Step 2: Get Free Database (3 minutes)

Your local database won't work. Get a free cloud database:

### Using Supabase (Recommended):

1. Go to: https://supabase.com
2. **Sign up** (free account)
3. Click **"New Project"**
4. Fill in:
   - **Name**: Dermalyze
   - **Database Password**: Create a strong password (SAVE IT!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. **Wait 2 minutes** for setup
7. Go to: **Settings** → **Database**
8. Find **"Connection string"** section
9. Click **"URI"** tab
10. Copy the connection string (looks like: `postgresql://postgres:[YOUR-PASSWORD]@...`)
11. Replace `[YOUR-PASSWORD]` with your actual password
12. Add it to Vercel as `DATABASE_URL`

---

## Step 3: Create Database Tables (2 minutes)

After database is ready, create the tables:

### Option A: Run Locally (Easiest)

1. Update your local `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
   ```

2. Run:
   ```bash
   npm run db:push
   ```

3. This creates all tables in Supabase

### Option B: Use Supabase SQL Editor

1. Go to Supabase → **SQL Editor**
2. You can manually create tables (not recommended - use Option A)

---

## Step 4: Redeploy

1. After adding all environment variables
2. Go to **Deployments** → Click **"..."** → **"Redeploy"**
3. Wait for build to complete
4. Test your app!

---

## ✅ Quick Checklist

- [ ] Added NEXTAUTH_URL to Vercel
- [ ] Added NEXTAUTH_SECRET to Vercel
- [ ] Created Supabase account
- [ ] Created Supabase project
- [ ] Copied DATABASE_URL from Supabase
- [ ] Added DATABASE_URL to Vercel
- [ ] Ran `npm run db:push` locally (with Supabase URL)
- [ ] Redeployed on Vercel
- [ ] Tested the app - should work now!

---

## 🆘 Still Not Working?

Check Vercel logs:
1. Go to your project
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"Functions"** tab
5. Check the error logs

Common issues:
- **Database connection error** → Check DATABASE_URL is correct
- **Missing env var** → Make sure all 3 are added
- **Tables don't exist** → Run `npm run db:push`

---

## 🎯 Most Likely Fix:

**Add the 3 environment variables and redeploy!**

That's usually all it takes. The 500 error is almost always missing environment variables.

