import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { elevatorRoutes } from './src/modules/elevator/routes/elevator.routes';
import { errorHandler } from './src/shared/middlewares/errorHandler';
import { swaggerDocument } from './src/config/swagger';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentado para suportar textos grandes

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', elevatorRoutes);

// Global Error Handler
app.use(errorHandler);

export { app };
