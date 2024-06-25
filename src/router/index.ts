import { Router } from 'express';
import { getHealthStatus } from 'services/healthService'

export const router = Router({});

router.get('/', (req, res) => {
    res.send('<h1>Wave app is running.</h1>')
})

/**
 * A database health check that uses an optional status query parameter
 */
router.get('/health', async (req, res) => {
	res.json(await getHealthStatus(req.query.status?.toString()));
});
