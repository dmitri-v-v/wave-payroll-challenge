import express, { Request, Response, NextFunction } from 'express';
import { router } from 'router'
import { getHealthStatus } from 'services/healthService'

export const app = express();

app.use(express.json());
app.use(router);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    console.error(err.stack); // Also log error stack for debugging
  
    res.status(500).send({ error: err.message });
  });
