import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DestinationList } from '../components/destination/destinationList';
import { fetchAllDestinations, deleteDestination } from '../services/api';
import type { Destination } from '../types/types';

export function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('1.useEffect running')
    
    console.log('Fetching destinations...');
    const loadDestinations = async () => {
      try {
        const data = await fetchAllDestinations();
        setDestinations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load destinations');
      } finally {
        setIsLoading(false);
      }
    };

    loadDestinations();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteDestination(id);
      setDestinations(destinations.filter(d => d.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete destination');
    }
  };

  if (isLoading) return <div>Loading destinations...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Destinations</h1>
        <Link
          to="/destinations/new"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Destination
        </Link>
      </div>
      <DestinationList destinations={destinations} onDeleteDestination={handleDelete} />
    </div>
  );
}