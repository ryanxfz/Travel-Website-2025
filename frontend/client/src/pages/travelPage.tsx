import {useState, useEffect} from 'react';
import TravelList from '../components/travel/travelList';
import TravelForm from '../components/travel/travelForm';
import {deleteTravel, fetchAllTravels, postTravel} from '../api/travelApi';
import Navbar from '../components/Navbar';

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

    // Group travels by month and year
    const groupedTravelsByMonthYear: { [monthYear: string]: any[] } = {};
    filteredTravels.forEach((travel: any) => {
      if (!travel.timePeriod) return;
      const date = new Date(travel.timePeriod);
      if (isNaN(date.getTime())) return;
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "May 2024"
      if (!groupedTravelsByMonthYear[monthYear]) {
        groupedTravelsByMonthYear[monthYear] = [];
      }
      groupedTravelsByMonthYear[monthYear].push(travel);
    });
    
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

            {Object.keys(groupedTravelsByMonthYear).length > 0 ? (
              Object.entries(groupedTravelsByMonthYear).map(([monthYear, travels]) => (
                <div key={monthYear} style={{ marginBottom: '2em', width: '100%' }}>
                  <h3 style={{ color: '#3498db', marginBottom: '0.5em' }}>{monthYear}</h3>
                  <TravelList
                    travels={travels}
                    onDelete={handleDeleteTravel}
                    onEdit={() => {}}
                  />
                </div>
              ))
            ) : (
              <div>No travels found with that name.</div>
            )}
          </div>
      );
}