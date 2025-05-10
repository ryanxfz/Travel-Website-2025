export interface Travel{
    id: string;
    name: string;
    description: string;
    timePeriod: Date;
    destinations: string[]; // Array of destination IDs or objects
}

export interface Destination{
    id: string;
    name: string;
    description: string;
    timePeriod: Date;
    activity: string;
    images: string;
}