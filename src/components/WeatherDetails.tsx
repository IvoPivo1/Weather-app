import { useEffect, useState } from "react";
import styled from "styled-components";
import { getCurrentWeather, WeatherResponse } from "../api/weatherApi";
import WeatherCard from "./WeatherCard";

const Message = styled.p`
  margin-top: 1rem;
`;

type Props = {
  city: string;
  darkMode: boolean;
  onDataLoaded?: (data: WeatherResponse) => void;
};

const WeatherDetails = ({ city, darkMode, onDataLoaded }: Props) => {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCurrentWeather(city);
        if (!cancelled) {
          setData(result);
          if (onDataLoaded) onDataLoaded(result);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message ?? "Something went wrong");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [city]);

  if (loading) return <Message>Loading weather...</Message>;
  if (error) return <Message>{error}</Message>;
  if (!data) return <Message>No data available</Message>;

  if (onDataLoaded) return null; // single-city mode → visa inget card

return <WeatherCard data={data} darkMode={darkMode} />;

};

export default WeatherDetails;
