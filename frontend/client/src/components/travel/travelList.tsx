import { useNavigate } from 'react-router-dom';
import TravelCard from './travelCard';
import './travel.css';

export default function TravelList({ travels, onDelete }: any) {
  const navigate = useNavigate();

  return (
    <div className="travel-list-container">
      {travels.map((travel: any) => (
        <div key={travel.id} className="travel-item">
          <TravelCard travel={travel} />
          <div className="travel-actions" style={{ display: "flex", gap: "1rem", marginTop: "0.5em" }}>
            <button
              onClick={() => navigate(`/travels/${travel.id}`)}
              style={{
                background: "#3498db",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1.5em",
                cursor: "pointer"
              }}
            >
              See Travel Details
            </button>
            <button
              onClick={() => navigate(`/travels/${travel.id}/edit`)}
              style={{
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1.5em",
                cursor: "pointer"
              }}
            >
              Edit
            </button>
            <button
              onClick={async () => {
                if (window.confirm('Are you sure you want to delete this travel?')) {
                  await onDelete(travel.id);
                }
              }}
              style={{
                background: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "0.5em 1.5em",
                cursor: "pointer"
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