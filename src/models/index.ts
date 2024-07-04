export interface JobGroup {
    id: number;
    name: string;
    rate: number
}

/**
 * Mapping from a jobGroupId from the database to its name value.
 */
export type JobGroupMap = {
    [key: string]: number;
};