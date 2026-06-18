import { useState, useRef, useEffect } from 'react'
import { Send, User, Renew, Bot, Microphone, MicrophoneFilled } from '@carbon/icons-react'
import { generateResponse } from './services/gemini'
import './App.css'

interface Message {
  id: number
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Welcome! I'm here to share everything about Utkarsh Anand - his professional journey, expertise, projects, and passions. What would you like to discover?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const chatMessagesRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [inputValue])

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputValue(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      // Get response from Gemini API
      const responseText = await generateResponse(inputValue)
      
      setIsTyping(false)
      const botMessage: Message = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      setIsTyping(false)
      const errorMessage: Message = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error while processing your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
      console.error('Error getting response:', error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "👋 Welcome! I'm here to share everything about Utkarsh Anand - his professional journey, expertise, projects, and passions. What would you like to discover?",
        sender: 'bot',
        timestamp: new Date()
      }
    ])
  }

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="chat-header">
        <div className="header-content">
          <div className="header-left">
            <div className="avatar-icon">
              <Bot size={24} />
            </div>
            <div className="header-info">
              <h1>All about me!</h1>
              <p>Discover Utkarsh's journey, expertise & passions</p>
            </div>
          </div>
          <button className="clear-button" onClick={handleClearChat} title="Clear chat">
            <Renew size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="messages-container" ref={chatMessagesRef}>
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === 'bot' ? (
                  <Bot size={18} />
                ) : (
                  <User size={18} />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-container">
          <button
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={toggleVoiceInput}
            disabled={isTyping}
            title={isListening ? "Stop listening" : "Voice input"}
          >
            {isListening ? <MicrophoneFilled size={20} /> : <Microphone size={20} />}
          </button>
          <textarea
            ref={textareaRef}
            className="message-input"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            disabled={isTyping}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === '' || isTyping}
            title="Send message"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="input-hint">
          {isListening ? '🎤 Listening...' : 'Press Enter to send, Shift + Enter for new line'}
        </p>
      </div>
    </div>
  )
}

export default App

// Made with Bob
