import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";
import { UserCircle, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";
  
  return (
    <div
      className={cn(
        "flex w-full gap-2 items-start mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot size={16} />
          </AvatarFallback>
        </Avatar>
      )}
      
      <Card className={cn(
        "max-w-[80%]",
        isBot ? "bg-muted" : "bg-primary text-primary-foreground"
      )}>
        <CardContent className="p-3">
          <div className="flex flex-col">
            <p className="text-sm leading-relaxed">{message.content}</p>
            <span className={cn(
              "text-xs mt-1",
              isBot ? "text-muted-foreground" : "text-primary-foreground/70"
            )}>
              {format(message.timestamp, "h:mm a")}
            </span>
          </div>
        </CardContent>
      </Card>
      
      {!isBot && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <UserCircle size={16} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}