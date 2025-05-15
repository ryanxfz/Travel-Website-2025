import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DestinationForm } from "../components/destination/destinationForm";
import { postDestination } from "../api/destinationApi";
import type { DestinationDTO } from "../types/types";
import { addDestinationToTravel } from "../api/travelApi";

//TODO: fix shit here
export function CreateDestinationPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const travelId = params.get("travelId");

  const handleCreateDestination = async (destination: DestinationDTO) => {
    setIsLoading(true);
    setError(null);

    try{
      //1. Create the destination
      const newDestination = await postDestination(destination);

      //2. if travelid exists, add this desitnation to the travel
      if(travelId && newDestination.id){
        await addDestinationToTravel(travelId, [newDestination.id])
      }

      //3. redirect back to the travel detail page
      navigate(`/travels/${travelId}`);
    }catch(err){
      setError(err instanceof Error ? err.message : "Failed to create destination");
    }finally{
      setIsLoading(false);
    }

    // try {
    //   await postDestination(destination);
    //   navigate("/destinations");
    //   console.log("Destination created");
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Failed to create destination");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create Destination</h1>
      {error && <div className="text-red-500">{error}</div>}
      <DestinationForm onSubmit={handleCreateDestination} isLoading={isLoading} />
    </div>
  );
}