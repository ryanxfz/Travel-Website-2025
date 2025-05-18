import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTravelById } from '../../api/travelApi';
import { removeDestinationFromTravel } from '../../api/travelApi';
import { fetchWeather } from '../../api/openWeatherApi';
import './travel.css';
import DestinationCard from '../destination/destinationCard';
import SearchBar from '../SearchBar';

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
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '1.5rem',
          background: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '0.5em 1.5em',
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        Home
      </button>
      <h1>{travel.name}</h1>
      <h2>Destinations</h2>
      <p>{travel.description}</p>
      <p>Travel Date: {new Date(travel.timePeriod).toLocaleDateString()}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          label="Search Destinations:"
          placeholder="Type to search..."
          style={{ minWidth: 300, maxWidth: 400 }}
        />
      </div>

      {Object.entries(groupedByMonthYear).map(([monthYear, dests]) => (
        <div key={monthYear} style={{ marginBottom: '2em', width: '100%' }}>
          <h3 style={{ color: '#3498db', marginBottom: '0.8em', fontSize: '2rem' }}>------{monthYear}------</h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              maxWidth: '1100px',
              margin: '0 auto',
              justifyContent: dests.length <= 2 ? 'center' : 'flex-start',
            }}
          >
            {dests.map((dest: any) => (
              <DestinationCard
                key={dest.id}
                dest={dest}
                loadingWeather={loadingWeather[dest.id]}
                weatherError={weatherError[dest.id]}
                weatherData={weatherData[dest.id]}
                onEdit={() => navigate(`/travels/${travelId}/destinations/edit/${dest.id}`)}
                onDelete={() => handleRemoveDestination(dest.id)}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        className="add-destination-button"
        onClick={() => navigate(`/destinations/new?travelId=${travelId}`)}
      >
        Add Destinations
      </button>
    </div>
  );
}