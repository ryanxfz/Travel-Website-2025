import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTravelByName } from '../../api/travelApi';

export default function TravelDetail() {
  const { travelName } = useParams();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTravel = async () => {
      if (travelName) {
        const data = await getTravelByName(travelName);
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
      <p>Start Date: {new Date(travel.startDate).toLocaleDateString()}</p>
      <p>End Date: {new Date(travel.endDate).toLocaleDateString()}</p>
      
      <h2>Destinations</h2>
      <div className="destinations-list">
        {/* Render destinations here */}
      </div>
      
      <button onClick={() => {/* Edit logic */}}>Edit</button>
      <button onClick={() => {/* Delete logic */}}>Delete</button>
    </div>
  );
}