export type JobGroup = {
    id: number
    name: string
    rate: number
}

/**
 * Mapping from a jobGroupId from the database to its name value.
 */
export type JobGroupMap = {
    [key: string]: number
}

/**
 * Mapping from jobGroupId in the DB to its rate value.
 */
export type JobGroupRateMap = {
    [key: number]: number
}

export type EmployeeReport = {
    employeeId: string
    amountPaid: number
    payPeriod: {
        startDate: Date
        endDate: Date
    }
}

export type PayrollReport = {
    employeeReports: EmployeeReport[]
}

export type Timesheet = {
    employeeId: string
    date: Date
    jobGroupId: number
    hours: number
}
