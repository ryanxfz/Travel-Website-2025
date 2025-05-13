import axios from 'axios';
import type { Travel, TravelDTO } from '../types/types';

const API_URL = 'http://localhost:4000/api/travel';

//TODO: create wrapper to handle errors and responses

export async function fetchAllTravels(): Promise<TravelDTO[]>{
    const response = await fetch(`${API_URL}/api/travels`);
    if (!response.ok) {
        throw new Error('Failed to fetch travels');
    }
    return response.json();
}

export async function fetchTravelByName(name: string): Promise<TravelDTO[]>{
    const response = await fetch(`${API_URL}/api/travels/${name}`);
    if (!response.ok) {
        throw new Error('Failed to fetch travel by name');
    }
    return response.json();
}

export async function postTravel(data: TravelDTO):Promise<Travel>{
    const response = await fetch(`${API_URL}/api/travels`, {
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
    const response = await fetch(`${API_URL}/api/travels/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete travel');
    }
}

export async function addDestinationToTravel(travelId: string, destinationIds: string): Promise<void>{
    const response = await fetch(`${API_URL}/api/travels/${travelId}/:destinations`, {
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
    const response = await fetch(`${API_URL}/api/travels/destination/${destinationId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch travel by destination ID');
    }
    return response.json();
}

export async function removeDestinationFromTravel(travelId: string, destinationIds: string): Promise<void>{
    const response = await fetch(`${API_URL}/api/travels/${travelId}/destinations`, {
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
// export const getTravelData = async () => {
//   try {
//     const response = await axios.get(API_URL);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching travel data:', error);
//     throw error;
//   }
// };

// export const getTravelByName = async (name: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/name/${name}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching travel by name:', error);
//     throw error;
//   }
// }

// export const createTravel = async (travelData: any) => {
//     try {
//         const response = await axios.post(API_URL, travelData);
//         return response.data;
//     } catch (error) {
//         console.error('Error creating travel:', error);
//         throw error;
//     }
// }

// export const addDestinationToTravel = async (travelId: string, destinationIds: string) => {
//     try {
//       const response = await axios.post(`${API_URL}/${travelId}/destinations`, { destinationId: destinationIds });
//       return response.data;
//     } catch (error) {
//         console.error('Error adding destination to travel:', error);
//         throw error;
//     }
// }

// export const removeDestinationFromTravel = async (travelId: string, destinationIds: string) => {
//     try {
//       await axios.delete(`${API_URL}/${travelId}/destinations`, { data: { destinationId: destinationIds } });
//     } catch (error) {
//         console.error('Error removing destination from travel:', error);
//         throw error;
//     }
// }

// export const deleteTravel = async (travelId: string) => {
//     try {
//         const response = await axios.delete(`${API_URL}/delete/${travelId}`);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting travel:', error);
//         throw error;
//     }
// }