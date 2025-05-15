import { useState } from 'react';

export default function TravelForm({ onSubmit, initialData = {} }: any) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    timePeriod: initialData.timePeriod || '',
    participants: initialData.participants || '',
    images: initialData.images || '',
  });

  // You can remove availableDestinations and related code if not used

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        <label>Images:</label>
        <input
          type="text"
          name="images"
          value={formData.images}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Participants:</label>
        <input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}