import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTravelById } from '../../api/travelApi';

export default function TravelDetail() {

  const navigate = useNavigate();
  const { travelId } = useParams();
  const [travel, setTravel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div>Loading...</div>;
  if (!travel) return <div>Travel not found</div>;

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
      <p>Description: {travel.description}</p>
      <p>Travel Date: {new Date(travel.timePeriod).toLocaleDateString()}</p>
      

      <div className="destinations-list">
        <p>Your destinations</p>
        <div className="destination-list-container">
          {travel.destinations && travel.destinations.length > 0 ? (
            travel.destinations.map((dest: any) => (
              <div key={dest.id} className="destination-card">
                <strong>Name:</strong> {dest.name} <br />
                <strong>Description:</strong> {dest.description} <br />
                <strong>Time Period:</strong> {dest.timePeriod} <br />
                <strong>Activity:</strong> {dest.activity} <br />
                <strong>Images:</strong> {dest.images} <br />
              </div>
            ))
          ) : (
            <p>No destinations yet.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate(`/destinations/new?travelId=${travelId}`)}>Add Destinations
      </button>
      <button onClick={() => {/* Delete logic */}}>Delete</button>
    </div>
  );
}