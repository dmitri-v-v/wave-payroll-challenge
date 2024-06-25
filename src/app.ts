import express, { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from 'services/healthService'

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Wave app is running.</h1>')
})

app.get('/health', async (req, res) => {
    res.json(await getHealthStatus(req.query.status?.toString()))
})

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    console.error(err.stack); // Also log error stack for debugging
  
    res.status(500).send({ error: err.message });
  });
