import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  text-align: left;
`;

const Slider = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const Slide = styled.div<{ darkMode: boolean }>`
  min-width: 130px; /* ⭐ Perfekt för mobil */
  padding: 1rem;
  border-radius: 1rem;
  scroll-snap-align: center;

  background: ${({ darkMode }) =>
    darkMode ? "rgba(30, 41, 59, 0.6)" : "rgba(255, 255, 255, 0.7)"};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  text-align: center;
  transition: transform 0.25s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (min-width: 768px) {
    min-width: 160px; /* ⭐ Större kort på tablet/desktop */
  }
`;

const Temp = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const Forecast = ({ city, darkMode }: { city: string; darkMode: boolean }) => {
  const [forecast, setForecast] = useState<any>(null);
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      setForecast(data);
    };

    fetchForecast();
  }, [city]);

  if (!forecast) return <p>Loading forecast...</p>;

  return (
    <Wrapper>
      <Title>5‑Day Forecast</Title>

      <Slider>
        {forecast.list.slice(0, 20).map((f: any) => (
          <Slide key={f.dt} darkMode={darkMode}>
            <p style={{ fontWeight: "bold" }}>
              {new Date(f.dt * 1000).toLocaleDateString("sv-SE", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </p>

            <p style={{ opacity: 0.8 }}>
              {new Date(f.dt * 1000).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <Temp>{Math.round(f.main.temp)}°C</Temp>

            <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
              {f.weather[0].description}
            </p>
          </Slide>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default Forecast;
