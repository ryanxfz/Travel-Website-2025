import type { Destination, CreateDestination} from "../types/types";

const API_BASE_URL = 'http://localhost:4000'; //could be without api, passt auf
console.log('API_BASE_URL:', API_BASE_URL);

export const fetchAllDestinations = async (): Promise<Destination[]> => {
    const response = await fetch(`${API_BASE_URL}/api/destinations`);
    if(!response.ok){
        throw new Error('Failed to fetch destinations');
    }
    return response.json();
};

export const fetchDestinationById = async (data: CreateDestination): Promise<Destination> => {
    const response = await fetch(`${API_BASE_URL}/api/destinations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if(!response.ok){
        throw new Error('Failed to fetch destination');
    }
    return response.json();
};

export const deleteDestination = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/destinations/${id}`, {
        method: 'DELETE',
    });
    if(!response.ok){
        throw new Error('Failed to delete destination');
    }
}

export const createDestination = async (data: CreateDestination): Promise<Destination> => {
    const response = await fetch(`${API_BASE_URL}/api/destinations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if(!response.ok){
        throw new Error('Failed to create destination');
    }
    return response.json();
}