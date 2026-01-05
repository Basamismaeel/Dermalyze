# ✅ Vercel Environment Variables Setup

## 🎉 Schema Push Complete!

Your database tables are now created in Supabase! ✅

---

## 📋 Add to Vercel (3 Variables)

Go to: **https://vercel.com/dashboard** → **dermalyze-one** → **Settings** → **Environment Variables**

### Variable 1: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://dermalyze-one.vercel.app`
- **Environments**: ✅ Production ✅ Preview ✅ Development

### Variable 2: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: (Get from your local `.env` file - run `cat .env | grep NEXTAUTH_SECRET`)
- **Environments**: ✅ Production ✅ Preview ✅ Development

### Variable 3: DATABASE_URL (POOLER - Important!)
- **Key**: `DATABASE_URL`
- **Value**: 
  ```
  postgresql://postgres.qwwuxzgjlfnkzasbrule:mgutBe7646gvpEuB@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true
  ```
- **Environments**: ✅ Production ✅ Preview ✅ Development

**⚠️ IMPORTANT**: Use the **POOLER** connection (port 6543) for Vercel, NOT the direct connection!

---

## 🚀 After Adding Variables

1. Go to **Deployments** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait 2-3 minutes
5. Test: **https://dermalyze-one.vercel.app**

---

## ✅ Why Pooler for Vercel?

- ✅ Better for serverless functions
- ✅ Handles connection pooling automatically
- ✅ More efficient for Vercel's architecture
- ✅ Prevents connection limit issues

**Direct connection** (port 5432) is only needed for:
- Schema migrations (`prisma db push`)
- Local development (optional)

---

## 🎉 You're Done!

After adding these 3 variables and redeploying, your app should work on Vercel! 🚀

