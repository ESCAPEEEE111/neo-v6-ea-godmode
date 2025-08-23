import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MatrixChatSystem = ({ className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: '> SYSTEM_INITIALIZED\n> Welcome to NOWHERE Digital AI Assistant\n> How can I help you dominate the digital matrix today?',
      timestamp: new Date(),
      typing: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  useEffect(() => {
    if (isOpen && !sessionId) {
      initializeChatSession();
    }
  }, [isOpen]);

  const initializeChatSession = async () => {
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/chat/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      });
      
      const result = await response.json();
      if (result.success) {
        setSessionId(result.data.session_id);
      }
    } catch (error) {
      console.error('Error initializing chat session:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: inputMessage,
      timestamp: new Date(),
      typing: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage = {
      id: Date.now() + 1,
      type: 'bot',
      message: '> AI_PROCESSING...',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/chat/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: inputMessage
        })
      });

      const result = await response.json();
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.typing));
      setIsTyping(false);

      if (result.success) {
        const botMessage = {
          id: Date.now() + 2,
          type: 'bot',
          message: `> ${result.data.response}`,
          timestamp: new Date(),
          typing: false
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage = {
          id: Date.now() + 2,
          type: 'bot',
          message: '> ERROR: Connection to AI matrix failed. Please try again.',
          timestamp: new Date(),
          typing: false
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => !msg.typing));
      setIsTyping(false);
      
      const errorMessage = {
        id: Date.now() + 2,
        type: 'bot',
        message: '> ERROR: Unable to connect to AI matrix. Please check your connection.',
        timestamp: new Date(),
        typing: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const quickReplies = [
    "Tell me about your services",
    "I need help with digital marketing",
    "What are your pricing plans?",
    "How can AI help my business?",
    "I want to book a consultation"
  ];

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
    chatInputRef.current?.focus();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-matrix-cyan to-matrix-bright-cyan text-black hover:from-matrix-bright-cyan hover:to-matrix-teal shadow-matrix-lg animate-pulse"
            style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
          >
            <MessageCircle className="w-8 h-8" />
          </Button>
          
          {/* Notification pulse */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping" />
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">1</span>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
          <Card 
            className={`bg-black/95 border-matrix-green backdrop-blur-md transition-all duration-300 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            }`}
            style={{ 
              boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)',
              border: '1px solid #00FF41'
            }}
          >
            {/* Chat Header */}
            <CardHeader className="p-4 border-b border-matrix-green/30">
              <div className="flex items-center justify-between">
                <CardTitle className="text-matrix-green font-mono flex items-center gap-2">
                  <Bot className="w-5 h-5 animate-pulse" />
                  <span className="matrix-text-glow">AI_AGENT_ONLINE</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-matrix-green hover:bg-matrix-green/10 p-1"
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-matrix-green hover:bg-matrix-green/10 p-1"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Content */}
            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-[500px]">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`p-3 rounded-lg font-mono text-sm leading-relaxed ${
                            message.type === 'user'
                              ? 'bg-matrix-green/20 text-matrix-green border border-matrix-green/30'
                              : 'bg-black/80 text-matrix-green border border-matrix-green/20'
                          } ${message.typing ? 'animate-pulse' : ''}`}
                        >
                          <div className="flex items-start gap-2 mb-2">
                            {message.type === 'bot' ? (
                              <Bot className="w-4 h-4 text-matrix-green mt-0.5" />
                            ) : (
                              <User className="w-4 h-4 text-matrix-green mt-0.5" />
                            )}
                            <span className="text-xs text-matrix-green/60">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <div className="whitespace-pre-wrap">
                            {message.message}
                            {message.typing && (
                              <span className="animate-pulse ml-1">█</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length <= 2 && (
                  <div className="px-4 py-2 border-t border-matrix-green/20">
                    <div className="text-xs text-matrix-green/60 font-mono mb-2">QUICK_COMMANDS:</div>
                    <div className="flex flex-wrap gap-1">
                      {quickReplies.map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="text-xs border-matrix-green/30 text-matrix-green/80 hover:bg-matrix-green/10 font-mono"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-matrix-green/30 bg-black/80">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={chatInputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your message..."
                        className="w-full bg-black/50 border border-matrix-green/20 rounded-lg px-3 py-2 text-matrix-green placeholder-matrix-green/40 font-mono text-sm resize-none h-10 focus:border-matrix-green focus:outline-none"
                        disabled={isTyping}
                      />
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="bg-matrix-green text-black hover:bg-matrix-green/80 px-3 py-2 rounded-lg transition-all duration-300"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-xs text-matrix-green/60 font-mono mt-2">
                    Status: {isTyping ? 'AI_PROCESSING...' : 'READY_FOR_INPUT'}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default MatrixChatSystem;