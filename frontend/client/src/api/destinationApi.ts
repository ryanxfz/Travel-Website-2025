import type { DestinationDTO } from "../types/types";
import type {Destination} from "../types/types";

const API_BASE_URL = 'http://localhost:4000'; //could be without api, passt auf
console.log('API_BASE_URL:', API_BASE_URL);

export async function fetchAllDestinations(): Promise<DestinationDTO[]> {
    const response = await fetch(`${API_BASE_URL}/api/destinations`);
    if (!response.ok) {
        throw new Error('Failed to fetch destinations');
    }
    return response.json();
}

export async function fetchDestinationById(id: string): Promise<DestinationDTO[]>{
    const response = await fetch(`/api/destinations/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch destination by ID');
    }
    return response.json();
}

//TODO: add fetchDestinationByName in BACKEND, then write the function here for the frontend
// export async function fetchDestinationByName(name: string): Promise<DestinationDTO[]> {

export async function deleteDestination(id: string): Promise<void> {
    const response = await fetch(`/api/destinations/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete destination');
    }
}

export async function postDestination(data: DestinationDTO): Promise<Destination>{
    const response = await fetch(`/api/destinations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Failed to create destination');
    }
    return response.json();
}