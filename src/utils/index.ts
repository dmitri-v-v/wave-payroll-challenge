const TIMESHEET_FILENAME_FORMAT = /time-report-(\d+)\.csv/

export const extractTimesheetIdFromFilename = (filename: string): number | null => {
    const match = filename.match(TIMESHEET_FILENAME_FORMAT)

    if (match) {
        const id = Number(match[1])

        if (!isNaN(id)) {
            return id
        }
    }

    return null;
}
