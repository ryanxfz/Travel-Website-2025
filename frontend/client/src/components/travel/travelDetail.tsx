import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTravelByName } from '../../api/travelApi';

export default function TravelDetail() {
  const { travelName } = useParams();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravel = async () => {
      if (travelName) {
        const data = await fetchTravelByName(travelName);
        setTravel(data[0]);
        setLoading(false);
      }
    };
    fetchTravel();
  }, [travelName]);

  if (loading) return <div>Loading...</div>;
  if (!travel) return <div>Travel not found</div>;

  return (
    <div className="travel-detail">
      <h1>{travel.name}</h1>
      <p>Description: {travel.description}</p>
      <p>Travel Date: {new Date(travel.timePeriod).toLocaleDateString()}</p>
      
      <h2>Destinations</h2>
      <div className="destinations-list">
        {/* Render destinations here */}
      </div>
      
      <button onClick={() => {/* Edit logic */}}>Edit</button>
      <button onClick={() => {/* Delete logic */}}>Delete</button>
    </div>
  );
}