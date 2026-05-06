import styled from "styled-components";
import type { WeatherResponse } from "../api/weatherApi";
import { weatherIcons } from "../weatherImages";
import { useNavigate } from "react-router-dom";

const Card = styled.article<{ darkMode: boolean }>`
  background: ${({ darkMode }) =>
    darkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.8)"};
  color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#0f172a")};
  border-radius: 1rem;
  padding: 1.5rem;
  margin-top: 1rem;
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

type Props = {
  data: WeatherResponse;
  darkMode: boolean;
};

const WeatherCard = ({ data, darkMode }: Props) => {
  const navigate = useNavigate();
  const weatherMain = data.weather[0].main;
  const description = data.weather[0].description;

  const customIcon =
    weatherIcons[description.toLowerCase()] || weatherIcons[weatherMain];

  return (
    <Card
      darkMode={darkMode}
      onClick={() => navigate(`/weather/${data.name}`)}
    >
      <h2>{data.name}</h2>
      <p>{description}</p>
      <p>Temperature: {Math.round(data.main.temp)}°C</p>
      <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind speed: {data.wind.speed} m/s</p>
      <p>Pressure: {data.main.pressure} hPa</p>
      <p>Visibility: {data.visibility} m</p>
      <p>Wind gust: {data.wind.gust ?? "N/A"} m/s</p>

      {customIcon && (
        <img
          src={customIcon}
          alt={weatherMain}
          style={{ width: "80px", marginTop: "1rem" }}
        />
      )}
    </Card>
  );
};

export default WeatherCard;
