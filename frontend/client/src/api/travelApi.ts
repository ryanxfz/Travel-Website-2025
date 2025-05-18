import type { Travel, TravelDTO } from '../types/types';

const API_BASE_URL = 'http://localhost:4000';

export async function fetchAllTravels(): Promise<TravelDTO[]>{
    const response = await fetch(`${API_BASE_URL}/api/travels`);
    if (!response.ok) {
        throw new Error('Failed to fetch travels');
    }
    return response.json();
}

export async function fetchTravelByName(name: string): Promise<TravelDTO[]>{
    const response = await fetch(`${API_BASE_URL}/api/travels/name/${name}`);
    if (!response.ok) {
        throw new Error('Failed to fetch travel by name');
    }
    return response.json();
}

export async function postTravel(data: TravelDTO):Promise<Travel>{
    const response = await fetch(`${API_BASE_URL}/api/travels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create travel');
    }
    return response.json();
}

export async function deleteTravel(id: string): Promise<void>{
    const response = await fetch(`${API_BASE_URL}/api/travels/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete travel');
    }
}

export async function addDestinationToTravel(travelId: string, destinationIds: string[]): Promise<void>{
    const response = await fetch(`${API_BASE_URL}/api/travels/${travelId}/destinations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destinationId: destinationIds }),
    });
    if (!response.ok) {
        throw new Error('Failed to add destination to travel');
    }
}

export async function fetchTravelByDestinationId(destinationId: string): Promise<TravelDTO[]>{
    const response = await fetch(`${API_BASE_URL}/api/travels/destination/${destinationId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch travel by destination ID');
    }
    return response.json();
}

export async function removeDestinationFromTravel(travelId: string, destinationIds: string[]): Promise<void>{
    const response = await fetch(`${API_BASE_URL}/api/travels/${travelId}/destinations`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destinationId: destinationIds }),
    });
    if (!response.ok) {
        throw new Error('Failed to remove destination from travel');
    }
}

export async function fetchTravelById(travelId: string){
    const response = await fetch(`${API_BASE_URL}/api/travels/${travelId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch travel by ID');
    }
    return response.json();
}

export async function updateTravel(travelId: string, data: Partial<TravelDTO>): Promise<Travel> {
    const response = await fetch(`${API_BASE_URL}/api/travels/${travelId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to update travel');
    }
    return response.json();
}
