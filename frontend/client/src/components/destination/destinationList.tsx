import type {Destination, DestinationDTO} from '../../types/types';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

interface DestinationListProperties{
    destinations: DestinationDTO[];
    onDeleteDestination: (id: string) => Promise<void>;
}

export function DestinationList({destinations, onDeleteDestination}: DestinationListProperties){
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            await onDeleteDestination(id);
        } catch (error) {
            console.error('Failed to delete destination:', error);
        } finally {
            setDeletingId(null);
        }
    }

    return(
        <div>
            <h2>Destinations</h2>
            <ul>
                {destinations.map((destination, index) => (
                    <li key={destination.id || index}>
                        <Link to={`/destinations/${destination.id}`}>
                            {destination.name}
                        </Link>
                        <button onClick={() => handleDelete(destination.id)} disabled={deletingId === destination.id}>
                            {deletingId === destination.id ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}