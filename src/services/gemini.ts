import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey || '');

// Default content if aboutme.md is not available
const defaultAboutMe = `# About Me

This is a personal AI assistant. The aboutme.md file hasn't been filled out yet with personal information.

Please update the aboutme.md file in the public folder with:
- Personal information
- Professional background
- Skills and expertise
- Work experience
- Education
- Projects
- Interests

Once updated, I'll be able to answer questions about this person accurately.`;

// Load aboutme.md content
let aboutMeContent = defaultAboutMe;

async function loadAboutMe() {
  try {
    console.log('Attempting to load aboutme.md...');
    const response = await fetch('/aboutme.md');
    console.log('Fetch response status:', response.status);
    
    if (response.ok) {
      aboutMeContent = await response.text();
      console.log('Successfully loaded aboutme.md');
    } else {
      console.warn('aboutme.md not found (404), using default context');
      aboutMeContent = defaultAboutMe;
    }
  } catch (error) {
    console.error('Error loading aboutme.md:', error);
    aboutMeContent = defaultAboutMe;
  }
}

// Load aboutme.md on initialization
loadAboutMe();

export async function generateResponse(userMessage: string): Promise<string> {
  try {
    // Ensure aboutme.md is loaded
    if (!aboutMeContent || aboutMeContent === defaultAboutMe) {
      await loadAboutMe();
    }

    console.log('Generating response for:', userMessage);
    console.log('Using API key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');

    // Initialize the model - using gemini-3.1-flash-lite as requested
    const model = genAI.getGenerativeModel({
      model: 'gemini-3.1-flash-lite'
    });

    // Create the system prompt with context
    const systemPrompt = `You are a personal AI assistant representing someone. Your role is to answer questions about this person based on the information provided below. Be friendly, professional, and helpful.

IMPORTANT INSTRUCTIONS:
- Respond in clear, natural English
- Only answer questions based on the information provided in the "About Me" section below
- If asked about something not mentioned in the information, politely say you don't have that information
- Keep responses concise and conversational (2-3 sentences max unless more detail is specifically requested)
- Be professional but friendly
- If the information contains placeholders (like [Your Name], [Your City]), acknowledge that the information hasn't been filled in yet

ABOUT ME INFORMATION:
${aboutMeContent}

Now, please respond to the user's question based on this information.`;

    // Generate response
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I will answer questions about you based on the information provided, and I will be honest if I don\'t have specific information.' }],
        },
      ],
    });

    console.log('Sending message to Gemini...');
    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const responseText = response.text();
    console.log('Received response from Gemini');
    
    return responseText;
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      if (error.message.includes('API key') || error.message.includes('API_KEY')) {
        return 'Sorry, there seems to be an issue with the API key configuration. Please verify the API key is correct.';
      }
      if (error.message.includes('quota') || error.message.includes('QUOTA')) {
        return 'Sorry, the API quota has been exceeded. Please try again later.';
      }
      if (error.message.includes('network') || error.message.includes('fetch')) {
        return 'Sorry, there seems to be a network issue. Please check your connection and try again.';
      }
      if (error.message.includes('model') || error.message.includes('MODEL')) {
        return 'Sorry, there seems to be an issue with the AI model configuration. The model name might be incorrect.';
      }
      
      // Return the actual error message for debugging
      return `Sorry, I encountered an error: ${error.message}. Please check the console for more details.`;
    }
    
    return 'Sorry, I encountered an unexpected error. Please try again.';
  }
}

// Function to reload aboutme.md (useful if content is updated)
export async function reloadAboutMe() {
  await loadAboutMe();
}

// Made with Bob
