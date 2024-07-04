import { Router } from 'express'
import multer from 'multer'
import { getHealthStatus } from 'services/healthService'
import { getJobGroupMap } from 'services/jobGroupService'
import {
    checkIfTimesheetUploadExists,
    importTimesheetData,
    recordTimesheetUpload,
} from 'services/timesheetUploadService'
import { extractTimesheetIdFromFilename } from 'utils'

export const router = Router({})

const upload = multer({ storage: multer.memoryStorage() })

router.get('/', (req, res) => {
    res.send('<h1>Wave app is running.</h1>')
})

/* --------------------- A database health check that uses an optional status query parameter. --------------------- */
router.get('/health', async (req, res) => {
    res.json(await getHealthStatus(req.query.status?.toString()))
})

/* ---------- Upload Upload a CSV file containing data on the number of hours worked per day per employee ---------- */
router.post('/timesheets/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: 'No file uploaded.' })
    }

    const timesheetId = extractTimesheetIdFromFilename(req.file.originalname)

    if (!timesheetId) {
        return res.status(400).send({ error: 'Filename did not contain a time report id.' })
    }

    if (await checkIfTimesheetUploadExists(timesheetId)) {
        return res.status(400).send({
            error: `Time report with id ${timesheetId} previously uploaded.`,
        })
    }

    try {
        const jobGroupMap = await getJobGroupMap()

        await importTimesheetData(timesheetId, req.file, jobGroupMap)
    } catch (err) {
        return res.status(500).send({ error: 'Error processing uploaded file.' })
    }

    try {
        await recordTimesheetUpload(timesheetId)
    } catch (err) {
        return res.status(500).send({ error: 'Error recording uploaded file.' })
    }

    return res.status(200).send({ message: 'Time report imported successfully.' })
})
