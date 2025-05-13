export interface TravelDTO{
    name: string;
    description: string;
    timePeriod: Date;
    destinations: string[]; // Array of destination IDs or objects
}

export interface Travel extends TravelDTO{
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface DestinationDTO{
    name: string;
    description: string;
    timePeriod: Date;
    activity: string;
    images: string;
}

export interface Destination extends DestinationDTO{
    id: string;
    createdAt: string;
    updatedAt: string;
}

// export interface CreateDestination{
//     name: string;
//     description: string;
//     timePeriod: Date; //maybe string, maybe date, we'll see.
//     activity: string;
//     images: string;
// }