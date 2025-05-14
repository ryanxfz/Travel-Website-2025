import { useState, useEffect } from 'react';
import { fetchAllDestinations } from '../../api/destinationApi';
import type { Destination } from '../../types/types';

export default function TravelForm({ onSubmit, initialData = {} }: any) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    timePeriod: initialData.timePeriod || '',
    destinations: initialData.destinations || [], // Array of selected destination IDs
  });

  const [availableDestinations, setAvailableDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    const loadDestinations = async () => {
      const data = await fetchAllDestinations();
      // Map DestinationDTO to Destination by adding missing properties
      const destinations: Destination[] = data.map((dto: any) => ({
        ...dto,
        id: dto.id ?? '', // Provide a fallback if id is missing
        createdAt: dto.createdAt ?? '',
        updatedAt: dto.updatedAt ?? '',
      }));
      setAvailableDestinations(destinations);
    };
    loadDestinations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({ ...prev, destinations: selectedOptions }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Time Period:</label>
        <input
          type="date"
          name="timePeriod"
          value={formData.timePeriod}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Destinations:</label>
        <select
          name="destinations"
          multiple
          value={formData.destinations}
          onChange={handleDestinationChange}
        >
          {availableDestinations.map((destination) => (
            <option key={destination.name} value={destination.id}>
              {destination.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}