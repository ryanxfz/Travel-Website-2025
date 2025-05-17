import { Link } from 'react-router-dom';
import type { Travel } from '../../types/types';

interface TravelCardProps {
  travel: Travel;
}

export default function TravelCard({ travel }: TravelCardProps) {
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div className="travel-card">
      <Link to={`/travels/name/${travel.name}`} className="travel-card-link">
        <div className="travel-card-header">
          <h3 className="travel-name">{travel.name}</h3>
          {travel.description && (
            <p className="travel-description">
              {travel.description.length > 100
                ? `${travel.description.substring(0, 100)}...`
                : travel.description}
            </p>
          )}
        </div>
        
        <div className="travel-dates">
          <span className="time-period">
            {formatDate(travel.timePeriod)}
          </span>
        </div>
        
        <div className="destination-count">
          <span className="count-badge">
            {travel.destinations?.length || 0} destinations
          </span>
        </div>
      </Link>
    </div>
  );
}

