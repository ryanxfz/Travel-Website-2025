import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postDestination } from "../api/destinationApi";
import type { DestinationDTO } from "../types/types";
import { addDestinationToTravel, fetchTravelById } from "../api/travelApi";

export function CreateDestinationPage() {
  const [formData, setFormData] = useState<DestinationDTO>({
    name: "",
    description: "",
    timePeriod: "",
    activity: "",
    images: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [travelTimePeriod, setTravelTimePeriod] = useState<string|null>(null); 
  
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const travelId = params.get("travelId");

  //fetch travel timeperiod
  useEffect(()=>{
    const fetchTravel = async () => {
      if(travelId){
        const travel = await fetchTravelById(travelId);
        setTravelTimePeriod(travel.timePeriod);
      }
    };
    fetchTravel();
  }, [travelId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    //check destination date with traveld date
    if(travelTimePeriod && formData.timePeriod){
      if(formData.timePeriod < travelTimePeriod){
        setError("!!! Destination date cannot be before travel date !!!");
        return;
      }
    }

    try {
      const newDestination = await postDestination(formData);
      if (travelId && newDestination.id) {
        await addDestinationToTravel(travelId, [newDestination.id]);
      }
      navigate(`/travels/${travelId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create destination");
    } finally {
      setIsLoading(false);
    }
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
          Create Destination
        </h1>
        <p style={{ color: "#444", textAlign: "center", marginBottom: "1.5rem", fontSize: "1rem" }}>
          Fill the form below with your destination details.
        </p>
        {error && <div style={{ color: "#e53e3e", marginBottom: "1rem", textAlign: "center" }}>{error}</div>}

        {/* Name and Activity side by side */}
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
            name="activity"
            placeholder="Activity"
            value={formData.activity}
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
            onClick={() => navigate(`/travels/${travelId}`)}
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
            Add Destination
          </button>
        </div>
      </form>
    </div>
  );
}