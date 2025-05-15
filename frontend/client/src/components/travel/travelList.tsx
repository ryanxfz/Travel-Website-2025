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
            <button onClick={() => navigate(`/travels/${travel.id}`)}>Edit</button>
            <button onClick={() => onDelete(travel.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}