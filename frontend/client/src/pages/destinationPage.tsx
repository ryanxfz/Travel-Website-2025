//REMOVE THIS FILE, NOT NEEDED

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllDestinations } from '../api/destinationApi';
import type { Destination } from '../types/types';
import { fetchWeather } from '../api/openWeatherApi';



export function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState<{ [id: string]: any }>({});
  const [loadingWeather, setLoadingWeather] = useState<{ [id: string]: boolean }>({});
  const [weatherError, setWeatherError] = useState<{ [id: string]: string | null }>({});

  useEffect(() => {
    async function loadDestinations() {
      try {
        const data = await fetchAllDestinations();
        setDestinations(data as Destination[]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load destinations');
      } finally {
        setIsLoading(false);
      }
    }
    loadDestinations();
  }, []);

  useEffect(() => {
  if (destinations.length === 0) return;

  destinations.forEach(async (destination) => {
    setLoadingWeather(prev => ({ ...prev, [destination.id]: true }));
    setWeatherError(prev => ({ ...prev, [destination.id]: null }));
    try {
      const data = await fetchWeather(destination.name);
      setWeatherData(prev => ({ ...prev, [destination.id]: data }));
    } catch (err) {
      setWeatherError(prev => ({ ...prev, [destination.id]: 'Weather not found' }));
    } finally {
      setLoadingWeather(prev => ({ ...prev, [destination.id]: false }));
    }
  });
  }, [destinations]);

  // Filter destinations based on search input
  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <div className="flex items-center gap-2 mb-2">
            <span className="font-medium">Search Destinations:</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="border rounded px-2 py-1"
            />
          </div>
          <ul className="space-y-4">
              {filteredDestinations.map((destination) => (
                <li key={destination.id} className="border p-4 rounded-md shadow">
                  <h2 className="text-lg font-semibold">{destination.name}</h2>
                  <p>{destination.description}</p>
                  <p>{destination.timePeriod.toString()}</p>
                  {loadingWeather[destination.id] && (
                    <div className="text-blue-500">Loading weather...</div>
                  )}
                  {weatherError[destination.id] && (
                    <div className="text-red-500">{weatherError[destination.id]}</div>
                  )}
                  {weatherData[destination.id] && (
                    <div className="mt-2">
                      <strong>Weather:</strong> {weatherData[destination.id].weather[0].main}, {weatherData[destination.id].main.temp}°C
                    </div>
                  )}
                </li>
              ))}
              {filteredDestinations.length === 0 && (
                <li className="text-gray-500">No destinations found.</li>
              )}
            </ul>
        </>
      )}
    </div>
  );
}