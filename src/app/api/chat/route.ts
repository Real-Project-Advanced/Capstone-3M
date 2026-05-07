import { NextRequest, NextResponse } from 'next/server';
import { AIService, Message } from '@/services/ai.service';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages as Message[];

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 });
    }

    // 1. Obtener respuesta de Ollama
    const aiResponse = await AIService.chat(messages);

    // 2. Loggear en MongoDB (No bloqueante)
    clientPromise.then(async (client) => {
      const db = client.db('smartops-medellin');
      await db.collection('ai_logs').insertOne({
        timestamp: new Date(),
        conversation: messages,
        response: aiResponse,
        model: 'smartops-bot'
      });
    }).catch(dbError => {
      console.error('Failed to log to MongoDB (Silent Error):', dbError);
    });

    return NextResponse.json({ 
      role: 'assistant', 
      content: aiResponse 
    });

  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
