"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ChatAssistantPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello. I am Aegis AI, your dedicated cybersecurity assistant. How can I help you analyze a threat today?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-five-brown-palvp06slw.vercel.app";
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, data]);
    } catch (error) {
      console.error("Error chatting with AI:", error);
      alert("Failed to connect to the security backend. Please ensure the FastAPI server is running on port 8000.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          Aegis Copilot
        </h1>
        <p className="text-muted-foreground">Ask me about vulnerabilities, threat mitigation, or to explain a scan result.</p>
      </div>

      <div className="flex-1 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden flex flex-col relative shadow-sm">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
              )}
              
              <div className={`max-w-[80%] rounded-xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-muted/50 border border-border/50 rounded-tl-sm'
              }`}>
                <p className="leading-relaxed text-sm">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className="h-10 w-10 shrink-0 rounded-lg bg-background border border-border/50 flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4 justify-start"
            >
               <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted/50 border border-border/50 rounded-xl rounded-tl-sm p-4 flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" />
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background/50 border-t border-border/50">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Aegis Copilot a security question..."
              className="w-full h-14 pl-6 pr-16 rounded-full border border-border/50 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={!input.trim() || isTyping} 
              className="absolute right-2 h-10 w-10 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
