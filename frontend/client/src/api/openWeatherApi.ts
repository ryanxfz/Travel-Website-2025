const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

export async function fetchWeather(city: string, country?: string){
    const q = country ? `${city},${country}` : city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok){
        throw new Error('Weather not found');
    }
    return res.json();
}