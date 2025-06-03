import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type FormValues = z.infer<typeof formSchema>;

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isDisabled?: boolean;
}

export function ChatInput({ onSendMessage, isDisabled = false }: ChatInputProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    onSendMessage(values.message);
    form.reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-2">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px] resize-none"
                  onKeyDown={handleKeyDown}
                  disabled={isDisabled}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="h-10 w-10"
          disabled={isDisabled}
        >
          <Send size={18} />
        </Button>
      </form>
    </Form>
  );
}