import axios from 'axios';

const API_URL = 'http://localhost:4000/api/travel';

//TODO: create wrapper to handle errors and responses

export const getTravelData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching travel data:', error);
    throw error;
  }
};

export const getTravelByName = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching travel by name:', error);
    throw error;
  }
}

export const createTravel = async (travelData: any) => {
    try {
        const response = await axios.post(API_URL, travelData);
        return response.data;
    } catch (error) {
        console.error('Error creating travel:', error);
        throw error;
    }
}

export const addDestinationToTravel = async (travelId: string, destinationIds: string) => {
    try {
      const response = await axios.post(`${API_URL}/${travelId}/destinations`, { destinationId: destinationIds });
      return response.data;
    } catch (error) {
        console.error('Error adding destination to travel:', error);
        throw error;
    }
}

export const removeDestinationFromTravel = async (travelId: string, destinationIds: string) => {
    try {
      await axios.delete(`${API_URL}/${travelId}/destinations`, { data: { destinationId: destinationIds } });
    } catch (error) {
        console.error('Error removing destination from travel:', error);
        throw error;
    }
}

export const deleteTravel = async (travelId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${travelId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting travel:', error);
        throw error;
    }
}