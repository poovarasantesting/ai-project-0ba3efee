import { useRef, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatMessage } from "@/components/ChatMessage";
import { Loader2 } from "lucide-react";

interface ChatHistoryProps {
  messages: Message[];
  isTyping: boolean;
}

export function ChatHistory({ messages, isTyping }: ChatHistoryProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isTyping && (
        <div className="flex items-center gap-2 text-muted-foreground ml-12 mb-4">
          <Loader2 size={16} className="animate-spin" />
          <span className="text-sm">Bot is typing...</span>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}