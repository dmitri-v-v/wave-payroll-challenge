import { Router } from 'express';
import multer from 'multer';
import { getHealthStatus } from 'services/healthService'
import { checkIfTimesheetUploadExists, recordTimesheetUpload } from 'services/timesheetUploadService'
import { extractTimesheetIdFromFilename } from 'utils'

export const router = Router({});

const upload = multer({ storage: multer.memoryStorage() });


router.get('/', (req, res) => {
    res.send('<h1>Wave app is running.</h1>')
})

/**
 * A database health check that uses an optional status query parameter
 */
router.get('/health', async (req, res) => {
	res.json(await getHealthStatus(req.query.status?.toString()));
});


router.post('/timesheets/upload', upload.single('file'), async (req, res) => {
    const filename = req.file?.originalname;

    if (!filename) {
        return res.status(400).send({ error: 'No file uploaded.' })
    }
    
    const id = extractTimesheetIdFromFilename(filename)

    if (!id) {
        return res.status(400).send({ error: 'Filename did not contain a time report id.' })
    }

    if (await checkIfTimesheetUploadExists(id)) {
        return res.status(400).send({ error: `Time report with id ${id} already uploaded.` })
    }

    await recordTimesheetUpload(id)

    res.status(200).send({ message: 'Time report uploaded successfully.' })
})
