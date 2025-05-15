import { Link, useNavigate } from 'react-router-dom';
import TravelCard from './travelCard';

export default function TravelList({ travels, onDelete }: any) {
  const navigate = useNavigate();

  return (
    <div className="travel-list">
      {travels.map((travel: any) => (
        <div key={travel.id} className="travel-item">
          <Link to={`/travels/${travel.id}`}>
            <TravelCard travel={travel} />
          </Link>
          <div className="travel-actions">
            <button onClick={() => navigate(`/travels/${travel.id}`)}>See Travel Details</button>
            <button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this travel?')) {
                  await onDelete(travel.id);
                }
              }}
              >
              Delete Travel
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}