# ⚡ Quick Push to GitHub

Your repo is connected! Choose one method:

## 🎯 Easiest: GitHub Desktop

1. Download: https://desktop.github.com
2. Sign in
3. File → Add Local Repository → Select this folder
4. Click "Publish repository"
5. Done! ✅

---

## 🔑 Method 2: Personal Access Token (5 minutes)

### Step 1: Create Token
1. Go to: https://github.com/settings/tokens/new
2. Name: "Dermalyze Push"
3. Expiration: 90 days (or No expiration)
4. Check: ✅ **repo** (all repo permissions)
5. Click "Generate token"
6. **COPY THE TOKEN** (you'll only see it once!)

### Step 2: Push
Run this command:
```bash
git push -u origin main
```

When it asks:
- **Username**: `Basamismaeel`
- **Password**: Paste the token (not your GitHub password!)

---

## 🔐 Method 3: Add SSH Key (One-time setup)

### Step 1: Copy Your SSH Key
Your key is already shown above. Copy it.

### Step 2: Add to GitHub
1. Go to: https://github.com/settings/keys
2. Click "New SSH key"
3. Title: "MacBook" (or any name)
4. Paste your key
5. Click "Add SSH key"

### Step 3: Push
```bash
git remote set-url origin git@github.com:Basamismaeel/Dermalyze.git
git push -u origin main
```

---

## ✅ After Pushing

Your code will be at: https://github.com/Basamismaeel/Dermalyze

Then deploy to Vercel:
1. https://vercel.com
2. Import "Dermalyze" repo
3. Deploy!

