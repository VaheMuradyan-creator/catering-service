# Deploy to Vercel - Quick Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `catering-service` (or your preferred name)
3. Choose **Private** or **Public**
4. **Don't** initialize with README, .gitignore, or license (we already have these)
5. Click **Create repository**

## Step 2: Connect Local Repo to GitHub

After creating the repo, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/catering-service.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

1. **Sign up/Login:** Go to https://vercel.com
   - Sign in with GitHub (recommended)

2. **Import Project:**
   - Click "Add New..." → "Project"
   - Select your `catering-service` repository
   - Click "Import"

3. **Configure Project:**
   - **Framework Preset:** Other (or leave default)
   - **Root Directory:** `./` (root)
   - **Build Command:** `cd client && npm install && npm run build`
   - **Output Directory:** `client/build`

4. **Environment Variables:**
   Add these in Vercel dashboard:
   
   **For Backend (API):**
   ```
   NODE_ENV=production
   CLIENT_URL=https://your-vercel-app.vercel.app
   JWT_SECRET=[generate one - see below]
   ```
   
   **For Frontend:**
   ```
   REACT_APP_API_URL=https://your-vercel-app.vercel.app/api
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   REACT_APP_GOOGLE_LOGIN_URI=https://your-vercel-app.vercel.app
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at: `https://your-app.vercel.app`

## Step 4: Add Custom Domain

1. In Vercel dashboard, go to your project
2. Settings → Domains
3. Add domain: `goldenservicebyAni.com`
4. Vercel will show DNS records to add

5. **Update Namecheap DNS:**
   - Log into Namecheap
   - Domain List → Manage → Advanced DNS
   - Delete old records
   - Add the DNS records Vercel provides (usually CNAME records)

## Generate JWT Secret

Run this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as `JWT_SECRET` in Vercel.

## Important Notes

- **Database:** SQLite won't persist on Vercel serverless. Consider migrating to a database service like:
  - Vercel Postgres (recommended)
  - Supabase (free tier)
  - PlanetScale (free tier)
  
- **File Storage:** The database file location is set to `/tmp/catering.db` for Vercel, but this is temporary. For production, use a proper database.

- **Environment Variables:** Set all environment variables in Vercel dashboard, not in `.env` files (those are for local development only).

## Troubleshooting

**Build fails?**
- Check Vercel build logs
- Verify all dependencies are in package.json
- Check that build commands are correct

**API not working?**
- Verify environment variables are set
- Check API routes in Vercel functions tab
- Verify CORS settings allow your domain

**Database issues?**
- SQLite on serverless is temporary
- Migrate to a proper database service for production

---

**That's it!** Your app will auto-deploy on every push to GitHub main branch.
