import {useState, useEffect} from 'react';
import TravelList from '../components/travel/travelList';
import TravelForm from '../components/travel/travelForm';
import {deleteTravel, fetchAllTravels, postTravel, fetchTravelByName } from '../api/travelApi';
//change the import to *

export default function TravelPage(){
    const [travels, setTravels] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    
    useEffect(() => {
        fetchTravels()
    }, []);

    const fetchTravels = async () => {
        const data = await fetchAllTravels();
        setTravels(data);
    }

    const handleDeleteTravel = async (id:string) => {
      await deleteTravel(id);
      fetchTravels();

    }

    const handleCreateTravel = async (formData: any) => {
        await postTravel(formData);
        fetchTravels();
        setShowForm(false); //close form after submission.. we'll see if it's
    }
    return (
        <div>
          <h1>Travels</h1>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Travel'}
          </button>
          
          {showForm && <TravelForm onSubmit={handleCreateTravel} />}
          
          <TravelList 
            travels={travels} 
            onDelete={handleDeleteTravel}
            onEdit={() => {}} 
          />
        </div>
      );
}