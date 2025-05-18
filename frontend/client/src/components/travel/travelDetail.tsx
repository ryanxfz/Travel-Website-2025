import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTravelById } from '../../api/travelApi';
import { removeDestinationFromTravel } from '../../api/travelApi';
import { fetchWeather } from '../../api/openWeatherApi';
import './travel.css';

export default function TravelDetail() {
  const navigate = useNavigate();

  const { travelId } = useParams();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  //for openWeatherAPI
  const [weatherData, setWeatherData] = useState<{ [id: string]: any }>({});
  const [loadingWeather, setLoadingWeather] = useState<{ [id: string]: boolean }>({});
  const [weatherError, setWeatherError] = useState<{ [id: string]: string | null }>({});

  useEffect(() => {
    const fetchTravel = async () => {
      if (travelId) {
        const data = await fetchTravelById(travelId);
        setTravel(data);
        setLoading(false);
      }
    };
    fetchTravel();
  }, [travelId]);

  useEffect(() => {
    if (!travel || !travel.destinations) return;
    travel.destinations.forEach(async (dest: any) => {
      setLoadingWeather(prev => ({ ...prev, [dest.id]: true }));
      setWeatherError(prev => ({ ...prev, [dest.id]: null }));
      try {
        const data = await fetchWeather(dest.name);
        setWeatherData(prev => ({ ...prev, [dest.id]: data }));
      } catch (err) {
        setWeatherError(prev => ({ ...prev, [dest.id]: 'Weather not found' }));
      } finally {
        setLoadingWeather(prev => ({ ...prev, [dest.id]: false }));
      }
    });
  }, [travel]);

  const handleRemoveDestination = async (destinationId: string) => {
    if (!travelId) return;
    if (!window.confirm('Remove this destination from the travel?')) return;
    await removeDestinationFromTravel(travelId, [destinationId]);
    // Refresh travel data
    const data = await fetchTravelById(travelId);
    setTravel(data);
  };

  if (loading) return <div>Loading...</div>;
  if (!travel) return <div>Travel not found</div>;

  const filteredDestinations = travel.destinations 
  ? travel.destinations.filter((dest: any) => dest.name.toLowerCase().includes(search.toLowerCase())
  )
  : [];

  // Group destinations by month and year
  const groupedByMonthYear: { [monthYear: string]: any[] } = {};
  filteredDestinations.forEach((dest: any) => {
    if (!dest.timePeriod) return;
    const date = new Date(dest.timePeriod);
    if (isNaN(date.getTime())) return;
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' }); // e.g., "May 2024"
    if (!groupedByMonthYear[monthYear]) {
      groupedByMonthYear[monthYear] = [];
    }
    groupedByMonthYear[monthYear].push(dest);
  });

  let formattedDate = "N/A";
  if (travel.timePeriod) {
    const dateObj = new Date(travel.timePeriod);
    formattedDate = isNaN(dateObj.getTime())
      ? "Invalid Date"
      : dateObj.toLocaleDateString();
  }


  return (
    <div className="travel-detail">
      <h1>{travel.name}</h1>
      <h2>Destinations</h2>
      <p>{travel.description}</p>
      <p>Travel Date: {new Date(travel.timePeriod).toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
          <span style={{ fontWeight: 800 }}>Search Destinations:</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type to search..."
            style={{ padding: '0.5em', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      <div className="destinations-list">
        <p>Your destinations</p>
        <div className="destination-list-container">
          {Object.keys(groupedByMonthYear).length > 0 ? (
            Object.entries(groupedByMonthYear).map(([monthYear, dests]) => (
              <div key={monthYear} style={{ marginBottom: '2em', width: '100%' }}>
                <h3 style={{ color: '#3498db', marginBottom: '0.5em' }}>{monthYear}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {dests.map((dest: any) => (
                    <div key={dest.id} className="destination-card">
                      <strong>Name:</strong> {dest.name} <br />
                      <strong>Description:</strong> {dest.description} <br />
                      <strong>Time Period:</strong> {dest.timePeriod} <br />
                      <strong>Activity:</strong> {dest.activity} <br />
                      <strong>Images:</strong> {dest.images} <br />

                      {loadingWeather[dest.id] && (
                        <div style={{ color: '#3498db' }}>Loading weather...</div>
                      )}
                      {weatherError[dest.id] && (
                        <div style={{ color: '#e74c3c' }}>Weather not found. Please check the city name</div>
                      )}
                      {weatherData[dest.id] && (
                        <div style={{ marginTop: '0.5em' }}>
                          <strong>Weather:</strong> {weatherData[dest.id].weather[0].main}, {weatherData[dest.id].main.temp}°C
                        </div>
                      )}
                      <button
                        style={{
                          marginTop: '0.5em',
                          marginRight: '0.5em',
                          background: '#3498db',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4em 1em',
                          cursor: 'pointer'
                        }}
                        onClick={() => navigate(`/travels/${travelId}/destinations/edit/${dest.id}`)}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          marginTop: '0.5em',
                          background: '#e74c3c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4em 1em',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleRemoveDestination(dest.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No destinations yet.</p>
          )}
        </div>
      </div>

      <button
        className="add-destination-button"
        onClick={() => navigate(`/destinations/new?travelId=${travelId}`)}
      >
        Add Destinations
      </button>
    </div>
  );
}