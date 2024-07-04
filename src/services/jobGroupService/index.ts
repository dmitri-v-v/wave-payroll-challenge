import { db } from 'db'
import { JobGroup, JobGroupMap } from 'models'

export const getJobGroupMap = async (): Promise<JobGroupMap> => {
    try {
        const jobGroups: JobGroup[] = await db.select<JobGroup>().from('JobGroup')

        const jobGroupMap: JobGroupMap = jobGroups.reduce((acc, jobGroup) => {
            acc[jobGroup.name] = jobGroup.id
            return acc
        }, {} as JobGroupMap)

        return jobGroupMap
    } catch (error) {
        console.error('Failed to build JobGroupMap', error)
        throw new Error()
    }
}
