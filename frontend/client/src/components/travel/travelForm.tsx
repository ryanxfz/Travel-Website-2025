import { useState } from 'react';

export default function TravelForm({ onSubmit, initialData = {}, onCancel, isLoading = false, error }: any) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    timePeriod: initialData.timePeriod || '',
    participants: initialData.participants || '',
    images: initialData.images || '',
  });

  const handleCancel = () =>{
    setShowForm(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
          Create Travel
        </h1>
        <p style={{ color: "#444", textAlign: "center", marginBottom: "1.5rem", fontSize: "1rem" }}>
          Fill the form below with your travel details.
        </p>
        {error && <div style={{ color: "#e53e3e", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

        {/* Name and Participants side by side */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
          <input
            type="text"
            name="participants"
            placeholder="Participants"
            value={formData.participants}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
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
          value={formData.images}
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
            value={formData.timePeriod}
            onChange={handleChange}
            style={{ flex: 1, padding: "0.5em", border: "1px solid #ccc", borderRadius: "5px" }}
            required
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#fff",
              color: "#333",
              border: "1px solid #888",
              borderRadius: "5px",
              padding: "0.5em 1.5em",
              cursor: "pointer"
            }}
            disabled={isLoading}
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
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Add Travel"}
          </button>
        </div>
      </form>
    </div>
  );
}