import { GoogleGenerativeAI } from '@google/generative-ai';
import { AppError } from '../../../shared/errors/AppError';
import { Message } from './TextStorageService';

export class ElevatorAIService {
  private ai: GoogleGenerativeAI;

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not defined');
    }
    this.ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }

  public async askQuestion(question: string, contextText: string, history: Message[]): Promise<string> {
    if (!contextText) {
      throw new AppError('Nenhum texto base foi fornecido ou armazenado.', 400);
    }

    const systemInstruction = `
Você é um assistente especializado nas Normas Operacionais de um Elevador Manual de Carga dos Anos 1970, com base no seguinte texto:

"${contextText}"

Regras obrigatórias:
1. Responda EXCLUSIVAMENTE com base nas informações fornecidas no texto acima.
2. Se a resposta não estiver contida no texto, responda exatamente: "Não sei com base nas informações fornecidas."
3. Não utilize conhecimentos prévios ou externos.
4. Mantenha o contexto da conversa, mas sempre respeitando o texto base.
    `.trim();

    try {
      const model = this.ai.getGenerativeModel({
        model: 'gemini-1.5-pro',
      });

      const chat = model.startChat({
        history: history,
        generationConfig: {
          temperature: 0.1,
        },
      });

      const fullPrompt = `${systemInstruction}\n\nPergunta: ${question}`;

      const result = await chat.sendMessage(fullPrompt);
      const response = await result.response;

      return response.text() || 'Não foi possível gerar uma resposta.';
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw new AppError('Erro ao processar a pergunta com a IA.', 500);
    }
  }
}
