# 🔧 Fix Vercel "Internal Server Error" - Environment Variables

## 🎯 The Problem

Your app works locally but shows "Internal server error" on Vercel because **environment variables are missing on Vercel**.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Go to Vercel Settings

1. Go to: **https://vercel.com/dashboard**
2. Click your project: **"dermalyze-one"**
3. Click **"Settings"** tab
4. Click **"Environment Variables"** (left sidebar)

### Step 2: Add These 3 Variables

Add each variable one by one:

#### Variable 1: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://dermalyze-one.vercel.app`
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 2: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: (Get from your local `.env` file or generate new one)
  - To get from local: Check your `.env` file for `NEXTAUTH_SECRET=...`
  - To generate new: Run `openssl rand -base64 32` in terminal
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

#### Variable 3: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: (You need a cloud database - see Step 3)
- **Environments**: ✅ Production ✅ Preview ✅ Development
- Click **"Save"**

---

## 🗄️ Step 3: Get Cloud Database (Required!)

Your local database won't work on Vercel. You need a cloud database.

### Option A: Supabase (Free & Recommended)

1. Go to: **https://supabase.com**
2. **Sign up** (free, no credit card needed)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `dermalyze`
   - **Database Password**: Create a strong password (SAVE IT!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. **Wait 2 minutes** for setup
7. Go to: **Settings** → **Database**
8. Scroll to **"Connection string"** section
9. Click **"URI"** tab
10. Copy the connection string
11. It looks like: `postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`
12. **Replace `[YOUR-PASSWORD]`** with your actual password
13. Add this to Vercel as `DATABASE_URL`

### Option B: Neon (Alternative - Free)

1. Go to: **https://neon.tech**
2. Sign up (free)
3. Create project
4. Copy connection string
5. Add to Vercel

---

## 📋 Step 4: Create Database Tables

After getting `DATABASE_URL`:

1. **Update your local `.env` file** with the Supabase URL:
   ```
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:YOUR_PASSWORD@aws-0-[REGION].pooler.supabase.com:6543/postgres"
   ```

2. **Run this command locally**:
   ```bash
   npm run db:push
   ```
   This creates all tables in your Supabase database.

---

## 🚀 Step 5: Redeploy

1. Go back to Vercel
2. Click **"Deployments"** tab
3. Click **"..."** (three dots) on latest deployment
4. Click **"Redeploy"**
5. Wait 2-3 minutes
6. Test: **https://dermalyze-one.vercel.app**

---

## ✅ Should Work Now!

After adding all 3 environment variables and setting up the database, your app should work on Vercel!

---

## 🔍 How to Check Your Local Values

To see what values you're using locally:

```bash
# In your project directory
cat .env | grep -E "(NEXTAUTH_URL|NEXTAUTH_SECRET|DATABASE_URL)"
```

**Note**: Don't copy `DATABASE_URL` from local - it points to your local database. You need a cloud database URL for Vercel.

---

## 🆘 Still Not Working?

### Check Vercel Logs:

1. Vercel → Your Project → **Deployments**
2. Click latest deployment
3. Click **"Functions"** tab
4. Look for error messages

### Common Errors:

- **"Environment variable not found: DATABASE_URL"**
  → Add `DATABASE_URL` in Vercel settings

- **"Environment variable not found: NEXTAUTH_SECRET"**
  → Add `NEXTAUTH_SECRET` in Vercel settings

- **"PrismaClientInitializationError"**
  → Check `DATABASE_URL` is correct
  → Make sure you ran `npm run db:push` with Supabase URL

---

**That's it! Add the environment variables to Vercel and it will work! 🎉**


