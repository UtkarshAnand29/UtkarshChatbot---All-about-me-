# Personal AI Chatbot - Setup Guide

## ⚠️ Important: API Key Issue

The Gemini API integration has been set up, but there's an issue with the API key provided. 

### Current Issue
The provided API key doesn't match the standard Google Gemini API key format.

**Standard Gemini API keys:**
- Start with `AIza`
- Are approximately 39 characters long
- Example format: `AIzaSyD...` (rest of the key)

### How to Get a Valid API Key

1. **Visit Google AI Studio**: https://makersuite.google.com/app/apikey
2. **Sign in** with your Google account
3. **Create a new API key** or use an existing one
4. **Copy the API key** (it should start with `AIza`)

### Update the API Key

Once you have a valid API key:

1. Open the `.env` file in the `chatbot` folder
2. Replace the current API key with your new one:
   ```
   VITE_GEMINI_API_KEY=AIzaSy...YourActualKeyHere
   ```
3. Save the file
4. Restart the development server:
   ```bash
   cd chatbot
   npm run dev
   ```

## Setup Instructions

### 1. Install Dependencies
```bash
cd chatbot
npm install
```

### 2. Configure Your Information

Edit `public/aboutme.md` with your personal information:
- Replace all placeholders like `[Your Name]`, `[Your City]`, etc.
- Add your actual skills, experience, education, and projects
- The chatbot will use this information to answer questions about you

### 3. Start the Development Server
```bash
npm run dev
```

The app will be available at: http://localhost:5173/

## Features

✅ **Modern UI Design**
- Beautiful gradient background
- Smooth animations
- Responsive design
- Typing indicators

✅ **Secure API Integration**
- API key stored in `.env` file (not committed to git)
- Error handling for API failures
- Detailed console logging for debugging

✅ **Smart Context**
- Reads from `aboutme.md` file
- Provides personalized responses
- Acknowledges when information isn't available

## File Structure

```
chatbot/
├── .env                    # API key (DO NOT COMMIT)
├── .gitignore             # Protects sensitive files
├── public/
│   ├── aboutme.md         # Your personal information
│   ├── user-avatar.png    # User avatar image
│   └── send-icon.svg      # Send button icon
├── src/
│   ├── App.tsx            # Main chatbot component
│   ├── App.css            # Chatbot styles
│   ├── services/
│   │   └── gemini.ts      # Gemini API integration
│   └── main.tsx           # App entry point
└── package.json           # Dependencies
```

## Troubleshooting

### API Key Errors
- **Error**: "API key not found" or "404 model not found"
- **Solution**: Verify your API key is valid and starts with `AIza`

### aboutme.md Not Loading
- **Error**: "404 aboutme.md not found"
- **Solution**: Ensure `aboutme.md` is in the `public` folder

### Network Errors
- **Error**: "Network issue" or "fetch failed"
- **Solution**: Check your internet connection and firewall settings

## Security Notes

🔒 **The `.env` file is protected:**
- Listed in `.gitignore`
- Never committed to version control
- Keep your API key private

🔒 **API Key Best Practices:**
- Don't share your API key
- Don't commit it to public repositories
- Rotate keys if compromised
- Set up API quotas in Google Cloud Console

## Next Steps

1. ✅ Get a valid Gemini API key
2. ✅ Update the `.env` file
3. ✅ Fill in your information in `aboutme.md`
4. ✅ Test the chatbot
5. ✅ Deploy (optional)

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is correct
3. Ensure `aboutme.md` is properly formatted
4. Check that all dependencies are installed

---

**Note**: The chatbot uses Google's Gemini 1.5 Flash model, which is fast and efficient for conversational AI tasks.