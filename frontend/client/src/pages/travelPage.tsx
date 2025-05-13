import {useState, useEffect} from 'react';
import TravelList from '../components/travel/travelList';
import TravelForm from '../components/travel/travelForm';
import {getTravelData, createTravel } from '../api/travelApi';

export default function TravelPage(){
    const [travels, setTravels] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetchTravels()
    }, []);

    const fetchTravels = async () => {
        const data = await getTravelData();
        setTravels(data);
    }

    const handleCreateTravel = async (formData: any) => {
        await createTravel(formData);
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
            onDelete={() => {}} 
            onEdit={() => {}} 
          />
        </div>
      );
}