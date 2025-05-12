import {useState} from 'react';
import type {CreateDestination} from '../../types/types';

interface DestinationFormProperties {
  initialData?: CreateDestination;
  onSubmit: (data: CreateDestination) => Promise<void>;
  isLoading: boolean;
}

export function DestinationForm({ initialData, onSubmit, isLoading }: DestinationFormProperties) {
  const [formData, setFormData] = useState<CreateDestination>(initialData || {
    name: '',
    description: '',
    timePeriod: new Date(),
    activity: '',
    images: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="timePeriod">Time Period</label>
        <input
          type="date"
          id="timePeriod"
          name="timePeriod"
          value={formData.timePeriod.toISOString().split('T')[0]}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="activity">Activity</label>
        <input
          type="text"
          id="activity"
          name="activity"
          value={formData.activity}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="images">Images</label>
        <input
          type="text"
          id="images"
          name="images"
          value={formData.images}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
}