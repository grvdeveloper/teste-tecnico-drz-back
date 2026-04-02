import { Request, Response, NextFunction } from 'express';
import { textStorageService } from '../services/TextStorageService';
import { ElevatorAIService } from '../services/ElevatorAIService';
import { UploadTextDTO, AskDTO } from '../dtos/ElevatorDTOs';

export class ElevatorController {
  private aiService: ElevatorAIService;

  constructor() {
    this.aiService = new ElevatorAIService();
  }

  public uploadText = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { text } = req.body as UploadTextDTO;
      textStorageService.storeText(text);
      
      res.status(200).json({
        message: 'Texto armazenado com sucesso.',
      });
    } catch (error) {
      next(error);
    }
  };

  public ask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question } = req.body as AskDTO;
      const contextText = textStorageService.getText();

      const answer = await this.aiService.askQuestion(question, contextText);

      res.status(200).json({
        answer,
      });
    } catch (error) {
      next(error);
    }
  };
}
