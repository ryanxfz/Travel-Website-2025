import {useState, useEffect} from 'react';
import TravelList from '../components/travel/travelList';
import TravelForm from '../components/travel/travelForm';
import {deleteTravel, fetchAllTravels, postTravel} from '../api/travelApi';

export default function TravelPage(){
    const [travels, setTravels] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');

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
        setShowForm(false);
    }

    const filteredTravels = travels.filter(travel =>
      travel.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
      <h1>Your Travels</h1>
      <input
        type="text"
        placeholder="Search by travel name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: '1em' }}
      />
      <br/>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>
          Add New Travel
        </button>
      )}

      {showForm && (
        <TravelForm
          onSubmit={handleCreateTravel}
          onCancel={() => setShowForm(false)} 
        />
      )}

      <TravelList
        travels={filteredTravels}
        onDelete={handleDeleteTravel}
        onEdit={() => {}}
      />
      {filteredTravels.length === 0 && (
        <div>No travels found with that name.</div>
      )}
    </div>
      );
}