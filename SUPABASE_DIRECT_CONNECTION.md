# 🔧 Get Direct Connection String from Supabase

## Why You Need This

`prisma db push` hangs with the **pooler** connection. You need the **direct** connection for schema operations.

---

## 📋 Steps to Get Direct Connection

1. **Go to Supabase Dashboard**
   - https://supabase.com/dashboard
   - Click your project

2. **Navigate to Database Settings**
   - Click **"Settings"** (left sidebar)
   - Click **"Database"**

3. **Get Connection String**
   - Scroll to **"Connection string"** section
   - Click **"URI"** tab
   - **IMPORTANT**: Select **"Direct connection"** (NOT pooler, NOT Prisma)
   - Copy the connection string

4. **It Should Look Like:**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

   **Key differences from pooler:**
   - ✅ Port: `5432` (not `6543`)
   - ✅ Host: `db.xxxxx.supabase.co` (not `aws-1-xxx.pooler.supabase.com`)
   - ❌ No `?pgbouncer=true`
   - ❌ No `pooler` in the URL

---

## 🔄 Two-Step Process

### Step 1: Use Direct for Schema Push

1. Update `.env` with direct connection
2. Run: `npx prisma db push`
3. Wait for success ✅

### Step 2: Switch Back to Pooler

1. Update `.env` back to pooler connection
2. Use pooler for Vercel (better for serverless)

---

## ✅ After You Get It

Paste the direct connection string here, and I'll:
1. Update `.env` with direct connection
2. Run `prisma db push`
3. Switch back to pooler
4. Show you what to add to Vercel

---

**The direct connection string is different from the pooler one!**

