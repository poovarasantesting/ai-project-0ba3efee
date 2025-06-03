import { useChat } from "@/hooks/useChat";
import { ChatHistory } from "@/components/ChatHistory";
import { ChatInput } from "@/components/ChatInput";

export default function ChatPage() {
  const { messages, isTyping, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="border-b py-4">
        <div className="container">
          <h1 className="text-2xl font-bold text-center">Simple Chat App</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col container max-w-3xl mx-auto overflow-hidden">
        <ChatHistory messages={messages} isTyping={isTyping} />
        
        <div className="p-4 border-t">
          <ChatInput onSendMessage={sendMessage} isDisabled={isTyping} />
        </div>
      </main>
    </div>
  );
}