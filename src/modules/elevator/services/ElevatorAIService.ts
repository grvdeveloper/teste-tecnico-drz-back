import { GoogleGenAI } from '@google/genai';
import { AppError } from '../../../shared/errors/AppError';

export class ElevatorAIService {
  private ai: GoogleGenAI;

  constructor() {
    // if (!process.env.GEMINI_API_KEY) {
    //   throw new Error('GEMINI_API_KEY is not defined');
    // }
    this.ai = new GoogleGenAI({ apiKey: "AIzaSyAwx8ZLFl_WRn5_QgdqvOL3X7AbPWRe8uc" });
  }

  public async askQuestion(question: string, contextText: string): Promise<string> {
    if (!contextText) {
      throw new AppError('Nenhum texto base foi fornecido ou armazenado.', 400);
    }

    const systemInstruction = `
Você é um assistente especializado em Normas Operacionais de um Elevador Manual de Carga dos Anos 1970.
Você deve responder às perguntas do usuário EXCLUSIVAMENTE com base no texto fornecido.
Se a resposta não estiver no texto, você deve responder EXATAMENTE: "Não sei com base nas informações fornecidas."
Não adicione informações externas, suposições ou conhecimentos prévios.
    `.trim();

    const prompt = `
TEXTO BASE:
${contextText}

PERGUNTA:
${question}
    `.trim();

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.1, // Baixa temperatura para respostas mais determinísticas e fiéis ao texto
        },
      });

      return response.text || 'Não foi possível gerar uma resposta.';
    } catch (error) {
      console.error('Erro ao chamar a API do Gemini:', error);
      throw new AppError('Erro ao processar a pergunta com a IA.', 500);
    }
  }
}
