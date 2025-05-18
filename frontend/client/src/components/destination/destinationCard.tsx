interface DestinationCardProps {
  dest: any;
  loadingWeather: boolean;
  weatherError: string | null;
  weatherData: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function DestinationCard({
  dest,
  loadingWeather,
  weatherError,
  weatherData,
  onEdit,
  onDelete,
}: DestinationCardProps) {
  return (
    <div className="destination-card">
      <strong>City/Place:</strong> {dest.name} <br />
      <strong>Description:</strong> {dest.description} <br />
      <strong>Time Period:</strong> {dest.timePeriod} <br />
      <strong>Activity:</strong> {dest.activity} <br />
      <strong>Images:</strong> {dest.images} <br />

      {loadingWeather && (
        <div style={{ color: "#3498db" }}>Loading weather...</div>
      )}
      {weatherError && (
        <div style={{ color: "#e74c3c" }}>Weather not found. Please check the city name</div>
      )}
      {weatherData && (
        <div style={{ marginTop: "0.5em" }}>
          <strong>Weather:</strong> {weatherData.weather[0].main}, {weatherData.main.temp}°C
        </div>
      )}
      <button
        style={{
          marginTop: "0.5em",
          marginRight: "0.5em",
          background: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.4em 1em",
          cursor: "pointer",
        }}
        onClick={onEdit}
      >
        Edit
      </button>
      <button
        style={{
          marginTop: "0.5em",
          background: "#e74c3c",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "0.4em 1em",
          cursor: "pointer",
        }}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}