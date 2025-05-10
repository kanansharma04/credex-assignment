import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import clsx from 'clsx';

type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt?: Date;
};

const predefinedResponses: Record<string, string> = {
  "hello": "Hello! How can I help you with software licensing today?",
  "hi": "Hi there! How can I assist you with software licensing questions today?",
  "hey": "Hey! Welcome to SoftShell. How can I help you with software licensing?",
  
  "what types of software licenses can i resell": "You can typically resell perpetual licenses for Microsoft, Adobe, Oracle, SAP, and many other software products. Volume licensing agreements, OEM licenses, and subscription services have different resale rules.",
  
  "how does the process work": "Our process is simple: 1) Submit your license details through our form, 2) Receive a market-based valuation within 24 hours, 3) Accept the offer and get paid within 48 hours.",
  
  "are microsoft licenses transferable": "Many Microsoft licenses are transferable, particularly perpetual licenses. Volume Licensing agreements like Open License, Select Plus, and Enterprise Agreements often allow transfers with proper documentation and Microsoft's approval.",
  
  "what documentation do i need": "You'll typically need proof of purchase, license keys or certificates, transfer of license documentation, and in some cases, a letter of destruction confirming software removal from original systems.",
  
  "how much is my license worth": "License value depends on several factors: age, version, demand, and transferability. Generally, newer versions retain 40-70% of their value, while older versions may retain 10-30%. Submit your details for a personalized valuation.",
  
  "do you buy adobe creative cloud licenses": "Adobe Creative Cloud subscriptions aren't typically transferable as they're tied to specific users. However, older perpetual Adobe licenses (CS6 and earlier) can often be resold.",
  
  "how quickly can i get paid": "Once you accept our offer, payment is typically processed within 48 hours via bank transfer, PayPal, or other preferred payment methods.",
  
  "is this legal": "Yes, reselling unused software licenses is legal in most jurisdictions under the first-sale doctrine, provided the original license agreement permits transfers. We ensure all transactions comply with applicable laws and vendor policies.",
  
  "what happens to my data": "We securely erase all software and data from your licenses during the transfer process. We provide a certificate of data destruction for your compliance records.",
  
  "how do you determine pricing": "Our pricing is based on current market demand, software version, remaining support periods, and license type. We analyze thousands of similar transactions to ensure fair market value.",
};

const defaultResponses = [
  "That's a great question about software licensing. Could you provide more details about your specific situation?",
  "I'd be happy to help with that. Can you tell me more about what type of software licenses you're interested in?",
  "Software licensing can be complex. We specialize in helping businesses maximize the value of unused licenses. What specific aspect are you curious about?",
  "Thanks for your question. Our license valuation experts can provide a detailed answer. Would you like me to connect you with our team?",
  "I understand you're asking about software licensing. We work with Microsoft, Adobe, Oracle, SAP and many other license types. Could you specify which vendor you're interested in?"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const initializeChat = () => {
    if (messages.length === 0) {
      setMessages([
        {
          id: nanoid(),
          content: "Hello! How can I help you with software licensing today?",
          role: "assistant",
          createdAt: new Date()
        }
      ]);
    }
  };
  
  const findResponse = (question: string): string => {
    const normalizedQuestion = question.toLowerCase().trim();
        for (const [key, response] of Object.entries(predefinedResponses)) {
      if (normalizedQuestion.includes(key)) {
        return response;
      }
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || isLoading) return;
    
    const userMessageId = nanoid();
    const userMessage = {
      id: userMessageId,
      content: newMessage,
      role: 'user' as const,
      createdAt: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);
    
    setTimeout(() => {
      const responseContent = findResponse(userMessage.content);
      
      setMessages(prev => [
        ...prev,
        {
          id: nanoid(),
          content: responseContent,
          role: 'assistant',
          createdAt: new Date()
        }
      ]);
      
      setIsLoading(false);
    }, 1000); 
  };
  
  const toggleChat = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen && messages.length === 0) {
      initializeChat();
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-4 rounded-full shadow-glow"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        <ChatBubbleLeftRightIcon className="h-6 w-6" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 h-[30rem] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden flex flex-col"
          >
            <div className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-4 flex justify-between items-center">
              <h3 className="font-bold">SoftShell Assistant</h3>
              <button onClick={toggleChat} className="text-green-600 dark:text-green-400">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={clsx(
                    "flex flex-col max-w-[85%] rounded-lg p-3",
                    message.role === 'user'
                      ? "ml-auto bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                  )}
                >
                  <span>{message.content}</span>
                  <span className="text-xs opacity-70 mt-1">
                    {message.createdAt
                      ? format(new Date(message.createdAt), 'HH:mm')
                      : ''}
                  </span>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex space-x-2 items-center text-gray-500 dark:text-gray-400">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                    className="h-2 w-2 bg-primary-500 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: 0.2,
                    }}
                    className="h-2 w-2 bg-primary-500 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: 'loop',
                      delay: 0.4,
                    }}
                    className="h-2 w-2 bg-primary-500 rounded-full"
                  />
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-gray-700 flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-l-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !newMessage.trim()}
                className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 p-2 rounded-r-md disabled:opacity-50"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;