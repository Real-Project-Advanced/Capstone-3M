'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MapPin, Bus, Navigation } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de SmartOps Medellín. ¿A dónde quieres ir hoy o qué ruta deseas consultar?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error('Error al conectar con la IA');

      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Lo siento, hubo un error al procesar tu solicitud. Asegúrate de que Ollama esté corriendo.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Navigation className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">SmartOps Medellín</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              IA de Movilidad Online
            </p>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-5xl mx-auto w-full relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300",
                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "p-2 rounded-lg shrink-0",
                msg.role === 'user' ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'user' 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-card border border-border rounded-tl-none"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-4 animate-pulse">
              <div className="p-2 rounded-lg bg-secondary">
                <Bot size={20} />
              </div>
              <div className="bg-card border border-border px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-t from-background to-transparent">
          <div className="relative glass rounded-2xl border border-border p-2 focus-within:ring-2 ring-primary/20 transition-all duration-300">
            <div className="flex items-center gap-2 px-2">
              <MapPin className="text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Pregúntame cómo llegar a algún lugar..."
                className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={cn(
                  "p-3 rounded-xl transition-all duration-300",
                  input.trim() ? "bg-primary text-primary-foreground scale-100" : "bg-muted text-muted-foreground scale-95 opacity-50"
                )}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
          <p className="mt-3 text-[10px] text-center text-muted-foreground uppercase tracking-widest">
            SmartOps Medellín - Movilidad Inteligente para la Ciudad
          </p>
        </div>
      </main>
    </div>
  );
}
