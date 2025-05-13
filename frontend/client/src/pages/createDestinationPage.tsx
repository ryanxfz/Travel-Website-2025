import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DestinationForm } from "../components/destination/destinationForm";
import { postDestination } from "../api/destinationApi";
import type { DestinationDTO } from "../types/types";
//TODO: fix shit here
export function CreateDestinationPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateDestination = async (destination: DestinationDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      await postDestination(destination);
      navigate("/destinations");
      console.log("Destination created");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create destination");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Destination</h1>
      {error && <div className="text-red-500">{error}</div>}
      <DestinationForm onSubmit={handleCreateDestination} isLoading={isLoading} />
    </div>
  );
}