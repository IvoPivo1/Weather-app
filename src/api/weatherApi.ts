const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export type WeatherResponse = {
  name: string;
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
};

export async function getCurrentWeather(city: string): Promise<WeatherResponse> {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric`
  );

  if (!res.ok) {
    if (res.status === 404) throw new Error("City not found");
    throw new Error("Failed to fetch weather data");
  }

  return res.json();
}
