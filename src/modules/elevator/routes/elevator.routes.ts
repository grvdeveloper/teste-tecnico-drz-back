import { Router } from 'express';
import { ElevatorController } from '../controllers/ElevatorController';
import { validateRequest } from '../../../shared/middlewares/validateRequest';
import { uploadTextSchema, askSchema } from '../dtos/ElevatorDTOs';

const elevatorRoutes = Router();
const elevatorController = new ElevatorController();

elevatorRoutes.post(
  '/upload-text',
  validateRequest(uploadTextSchema),
  elevatorController.uploadText
);

elevatorRoutes.post(
  '/ask',
  validateRequest(askSchema),
  elevatorController.ask
);

export { elevatorRoutes };
