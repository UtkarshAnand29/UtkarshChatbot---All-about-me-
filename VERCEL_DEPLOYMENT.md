# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account (✅ Already done)
- Vercel account (free)
- Valid Google Gemini API key

## Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

## Step 2: Import Your Project

1. Once logged in to Vercel, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"UtkarshChatbot---All-about-me-"** and click **"Import"**

## Step 3: Configure Project Settings

### Framework Preset
- Vercel should auto-detect **"Vite"** as the framework
- If not, select **"Vite"** from the dropdown

### Build Settings (Usually auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Root Directory
- Leave as **"./"** (root)

## Step 4: Add Environment Variables

This is the **MOST IMPORTANT** step!

1. In the project configuration page, scroll down to **"Environment Variables"**
2. Click **"Add"** or the **"+"** button
3. Add your environment variable:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** Your actual Gemini API key (starts with `AIza`)
   - **Environment:** Select all (Production, Preview, Development)
4. Click **"Add"**

⚠️ **Important:** Make sure you use a valid Google Gemini API key that starts with `AIza`

## Step 5: Deploy

1. Click **"Deploy"** button
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, you'll see:
   - ✅ Deployment successful
   - 🌐 Your live URL (e.g., `your-chatbot.vercel.app`)

## Step 6: Test Your Deployment

1. Click on the deployment URL
2. Test the chatbot:
   - Try asking questions about Utkarsh
   - Test the voice input feature
   - Verify the UI looks correct

## Troubleshooting

### Issue: Build Fails
**Solution:** Check the build logs in Vercel dashboard for specific errors

### Issue: API Key Not Working
**Solution:** 
1. Go to your Vercel project settings
2. Navigate to **"Environment Variables"**
3. Verify `VITE_GEMINI_API_KEY` is set correctly
4. Redeploy the project

### Issue: 404 Error on Routes
**Solution:** Vite handles this automatically, but if issues persist:
1. Check that `dist` folder is being generated
2. Verify build command is `npm run build`

### Issue: Voice Input Not Working
**Solution:** Voice input requires HTTPS, which Vercel provides automatically. Make sure you're accessing via the Vercel URL (not localhost).

## Custom Domain (Optional)

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Automatic Deployments

✅ **Already configured!** Every time you push to the `main` branch on GitHub:
- Vercel automatically builds and deploys your changes
- You'll get a new deployment URL
- Previous deployments remain accessible

## Managing Your Deployment

### View Deployments
- Go to your Vercel dashboard
- Click on your project
- See all deployments with timestamps

### Rollback to Previous Version
- Click on any previous deployment
- Click **"Promote to Production"**

### Update Environment Variables
1. Go to **Settings** → **Environment Variables**
2. Edit or add new variables
3. **Important:** Redeploy after changing variables

## Production URL

After deployment, your chatbot will be live at:
```
https://your-project-name.vercel.app
```

You can share this URL with anyone!

## Next Steps

1. ✅ Deploy to Vercel
2. 🔗 Share your live chatbot URL
3. 📊 Monitor usage in Vercel Analytics (free)
4. 🎨 Customize domain (optional)

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

**Note:** The free Vercel plan includes:
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100GB bandwidth/month
- Perfect for personal projects!