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
    createdAt: string;
    updatedAt: string;
}

export interface CreateDestination{
    name: string;
    description: string;
    timePeriod: Date; //maybe string, maybe date, we'll see.
    activity: string;
    images: string;
}