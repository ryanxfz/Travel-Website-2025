import {useState, useEffect} from 'react';
import TravelList from '../components/travel/travelList';
import TravelForm from '../components/travel/travelForm';
import {deleteTravel, fetchAllTravels, postTravel, fetchTravelByName } from '../api/travelApi';
//change the import to *

export default function TravelPage(){
    const [travels, setTravels] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<any[] | null>(null);
    
    useEffect(() => {
        fetchTravels()
    }, []);

    const fetchTravels = async () => {
        const data = await fetchAllTravels();
        setTravels(data);
        setSearchResult(null);
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

    const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if(search.trim() === ''){
        setSearchResult(null);
        fetchTravels();
        return;
      }
      try{
        const result = await fetchTravelByName(search.trim());
        setSearchResult(result && result.length > 0 ? result : []);
      }catch{
        setSearchResult([]);
      }
    }

    return (
        <div>
      <h1>Travels</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1em' }}>
        <input
          type="text"
          placeholder="Search by travel name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
        <button
          type="button"
          onClick={() => {
            setSearch('');
            setSearchResult(null);
            fetchTravels();
          }}
          style={{ marginLeft: '0.5em' }}
        >
          Reset
        </button>
      </form>

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
        travels={searchResult !== null ? searchResult : travels}
        onDelete={handleDeleteTravel}
        onEdit={() => {}}
      />
      {searchResult && searchResult.length === 0 && (
        <div>No travels found with that name.</div>
      )}
    </div>
      );
}