export interface TravelDTO{
    name: string;
    description: string;
    timePeriod: Date;
    destinations: string[];
}

export interface Travel extends TravelDTO{
    id: string;
    createdAt: string;
    updatedAt: string;
}

export interface DestinationDTO{
    name: string;
    description: string;
    timePeriod: string;
    activity: string;
    images: string;
}

export interface Destination extends DestinationDTO{
    id: string;
    createdAt: string;
    updatedAt: string;
}