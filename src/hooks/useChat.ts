import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/types/chat";

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 60000 * 2),
  },
  {
    id: "2",
    content: "I'd like to know more about your services.",
    sender: "user",
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: "3",
    content: "Sure! We offer web development, mobile app development, and UI/UX design services.",
    sender: "bot",
    timestamp: new Date(),
  },
];

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: uuidv4(),
        content: getBotResponse(content),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello there! How can I assist you today?";
    } else if (lowerMessage.includes("help")) {
      return "I'm here to help! What do you need assistance with?";
    } else if (lowerMessage.includes("bye") || lowerMessage.includes("goodbye")) {
      return "Goodbye! Have a great day!";
    } else if (lowerMessage.includes("thank")) {
      return "You're welcome! Is there anything else you'd like to know?";
    } else {
      return "That's interesting. Can you tell me more about that?";
    }
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
}