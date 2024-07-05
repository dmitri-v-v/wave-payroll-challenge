import { db } from 'db'
import { JobGroup, JobGroupMap, JobGroupRateMap } from 'models'

let jobGroupsCache: JobGroup[] | null = null
let cacheTimestamp: number = 0
const CACHE_TTL = 3600000 // 1 hour in milliseconds

/**
 * Fetch job groups from the DB, or from the cache if recently fetched.
 * */
const getJobGroups = async (): Promise<JobGroup[]> => {
    const currentTime = Date.now()

    if (jobGroupsCache && currentTime - cacheTimestamp < CACHE_TTL) {
        return jobGroupsCache
    }

    try {
        const jobGroups: JobGroup[] = await db.select<JobGroup>().from('JobGroup')
        jobGroupsCache = jobGroups
        cacheTimestamp = currentTime
        console.log('Fetched JobGroups from the DB.')
        return jobGroups
    } catch (error) {
        console.error('Failed to fetch JobGroups', error)
        throw new Error()
    }
}

export const getJobGroupMap = async (): Promise<JobGroupMap> => {
    try {
        const jobGroups = await getJobGroups()

        return jobGroups.reduce((jobGroupMap, jobGroup) => {
            jobGroupMap[jobGroup.name] = jobGroup.id
            return jobGroupMap
        }, {} as JobGroupMap)
    } catch (error) {
        console.error('Failed to build JobGroupMap', error)
        throw new Error()
    }
}

export const getJobGroupRateMap = async (): Promise<JobGroupRateMap> => {
    try {
        const jobGroups = await getJobGroups()

        return jobGroups.reduce((jobGroupRateMap, jobGroup) => {
            jobGroupRateMap[jobGroup.id] = jobGroup.rate
            return jobGroupRateMap
        }, {} as JobGroupRateMap)
    } catch (error) {
        console.error('Failed to build JobGroupRateMap', error)
        throw new Error()
    }
}
