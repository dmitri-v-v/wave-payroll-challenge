const TIMESHEET_FILENAME_FORMAT = /time-report-(\d+)\.csv/

export const extractTimesheetIdFromFilename = (filename: string): string | null => {
    const match = filename.match(TIMESHEET_FILENAME_FORMAT)

    return match? match[1] : null
}
 export const parseDate = (dateString: string): Date => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}
