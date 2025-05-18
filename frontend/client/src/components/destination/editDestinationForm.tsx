import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchDestinationById, updateDestinationInTravel } from '../../api/destinationApi';
import type { DestinationDTO } from '../../types/types';

export default function EditDestinationForm() {
  const { destinationId, travelId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<DestinationDTO & { activity?: string; images?: string }>>({
    name: '',
    description: '',
    timePeriod: '',
    activity: '',
    images: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDestination() {
      try {
        if (destinationId) {
          const data = await fetchDestinationById(destinationId);
          const dest = Array.isArray(data) ? data[0] : data;
          setForm({
            name: dest?.name || '',
            description: dest?.description || '',
            timePeriod: dest?.timePeriod || '',
            activity: dest?.activity || '',
            images: dest?.images || ''
          });
        }
      } catch (err) {
        setError('Failed to load destination');
      } finally {
        setLoading(false);
      }
    }
    loadDestination();
  }, [destinationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (destinationId && travelId) {
        await updateDestinationInTravel(travelId, destinationId, {
          name: form.name ?? '',
          description: form.description ?? '',
          timePeriod: form.timePeriod ?? '',
          activity: form.activity ?? '',
          images: form.images ?? ''
        });
        navigate(`/travels/${travelId}`);
      }
    } catch (err) {
      setError('Failed to update destination');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          padding: "2.5rem 2rem",
          minWidth: "340px",
          maxWidth: "420px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "center"
        }}
      >
        <h1 style={{ color: "#444", textAlign: "center", fontWeight: "bold", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
          Edit Destination
        </h1>
        <p style={{ color: "#444", textAlign: "center", marginBottom: "1.5rem", fontSize: "1rem" }}>
          Update your destination details below.
        </p>
        {error && <div style={{ color: "#e53e3e", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

        {/* Name and Activity side by side */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="City/Place"
            value={form.name}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
          <input
            type="text"
            name="activity"
            placeholder="Activity"
            value={form.activity}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{ marginBottom: "1rem", padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px", resize: "vertical" }}
          rows={2}
          required
        />

        {/* Images */}
        <input
          type="text"
          name="images"
          placeholder="Images (URL or description)"
          value={form.images}
          onChange={handleChange}
          style={{ marginBottom: "1rem", padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
          required
        />

        {/* Time Period */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
          <input
            type="date"
            name="timePeriod"
            placeholder="Time Period"
            value={form.timePeriod}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => navigate(`/travels/${travelId}`)}
            style={{
              background: "#fff",
              color: "#333",
              border: "1px solid #888",
              borderRadius: "5px",
              padding: "0.5em 1.5em",
              cursor: "pointer"
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background: "#333",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "0.5em 1.5em",
              cursor: "pointer"
            }}
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}