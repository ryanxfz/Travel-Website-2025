import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllDestinations } from '../api/destinationApi';
import type { DestinationDTO } from '../types/types';

export function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const data = await fetchAllDestinations();
        setDestinations(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load destinations');
      } finally {
        setIsLoading(false);
      }
    }
    loadDestinations();
  }, []);

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div>Loading destinations...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Destinations</h1>
            <Link
              to="/destinations/new"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Destination
            </Link>
          </div>
          <ul className="space-y-4">
            {destinations.map((destination, index) => (
              <li key={index} className="border p-4 rounded-md shadow">
                <h2 className="text-lg font-semibold">{destination.name}</h2>
                <p>{destination.description}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}