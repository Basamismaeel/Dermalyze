# 🔧 Fix Vercel 500 Error - Step by Step

Your app: https://dermalyze-one.vercel.app

---

## 🎯 The Problem:
Missing environment variables or database connection.

---

## ✅ Fix It Now (5 minutes):

### Step 1: Check Vercel Logs (1 min)

1. Go to: https://vercel.com/dashboard
2. Click **"dermalyze-one"** project
3. Click **"Deployments"** tab
4. Click on the latest deployment
5. Click **"Functions"** tab
6. **Check the error** - it will tell you what's missing

Common errors:
- "Environment variable not found: DATABASE_URL"
- "Environment variable not found: NEXTAUTH_SECRET"
- "PrismaClientInitializationError"

---

### Step 2: Add Environment Variables (2 min)

1. In Vercel, go to: **Settings** → **Environment Variables**
2. **Add these 3 variables**:

#### Variable 1: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://dermalyze-one.vercel.app`
- **Environments**: ✅ Production ✅ Preview ✅ Development

#### Variable 2: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: `PNnt+S7au7cu+HR1rDUb/oIpyXjNL8PIJ2BDz5W0eOM=`
- **Environments**: ✅ Production ✅ Preview ✅ Development

#### Variable 3: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: Get from Supabase (see Step 3)
- **Environments**: ✅ Production ✅ Preview ✅ Development

3. Click **"Save"** for each one

---

### Step 3: Get Free Database (3 min)

Your local database won't work. Get a free cloud database:

#### Option A: Supabase (Recommended - Free)

1. Go to: https://supabase.com
2. **Sign up** (free account - no credit card needed)
3. Click **"New Project"**
4. Fill in:
   - **Name**: dermalyze
   - **Database Password**: Create a strong password (SAVE IT!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. **Wait 2 minutes** for database to set up
7. Go to: **Settings** → **Database**
8. Scroll to **"Connection string"** section
9. Click **"URI"** tab
10. Copy the connection string
11. It looks like: `postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`
12. **Replace `[YOUR-PASSWORD]`** with your actual password
13. Add this to Vercel as `DATABASE_URL`

#### Option B: Neon (Alternative - Free)

1. Go to: https://neon.tech
2. Sign up (free)
3. Create project
4. Copy connection string
5. Add to Vercel

---

### Step 4: Create Database Tables (1 min)

After getting DATABASE_URL:

1. **Update your local `.env` file**:
   ```
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:YOUR_PASSWORD@aws-0-[REGION].pooler.supabase.com:6543/postgres"
   ```
   (Use the actual connection string from Supabase)

2. **Run this command**:
   ```bash
   npm run db:push
   ```

3. This creates all tables in your Supabase database

---

### Step 5: Redeploy (1 min)

1. Go back to Vercel
2. Click **"Deployments"** tab
3. Click **"..."** (three dots) on latest deployment
4. Click **"Redeploy"**
5. Wait 2-3 minutes
6. Test: https://dermalyze-one.vercel.app

---

## ✅ Should Work Now!

After these steps, your app should work!

---

## 🆘 Still Not Working?

### Check Vercel Logs:

1. Vercel → Your Project → **Deployments**
2. Click latest deployment
3. Click **"Functions"** tab
4. Look for error messages

### Common Errors & Fixes:

**Error: "Environment variable not found: DATABASE_URL"**
→ Add DATABASE_URL in Vercel settings

**Error: "Environment variable not found: NEXTAUTH_SECRET"**
→ Add NEXTAUTH_SECRET in Vercel settings

**Error: "PrismaClientInitializationError"**
→ Check DATABASE_URL is correct
→ Make sure you ran `npm run db:push`

**Error: "Can't reach database"**
→ Check DATABASE_URL format
→ Make sure database is running
→ Check if password is correct

---

## 📋 Quick Checklist:

- [ ] Checked Vercel logs for specific error
- [ ] Added NEXTAUTH_URL to Vercel
- [ ] Added NEXTAUTH_SECRET to Vercel
- [ ] Created Supabase account
- [ ] Created Supabase project
- [ ] Copied DATABASE_URL from Supabase
- [ ] Added DATABASE_URL to Vercel
- [ ] Updated local .env with Supabase URL
- [ ] Ran `npm run db:push`
- [ ] Redeployed on Vercel
- [ ] Tested the app ✅

---

## 💡 Pro Tip:

The error message in Vercel logs will tell you exactly what's missing. Check the logs first!

---

**Most important:** Add the 3 environment variables and redeploy!

