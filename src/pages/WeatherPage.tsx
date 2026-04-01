import { useParams, useNavigate } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";
import styled from "styled-components";
import { useState } from "react";

type Props = {
  cities: string[];
  removeCity: (city: string) => void;
  darkMode: boolean;
};

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
`;

const Card = styled.div<{darkMode: boolean}>`
  position: relative;
  background: ${({ darkMode }) =>
  darkMode
    ? "rgba(30, 41, 59, 0.55)"
    : "rgba(255, 255, 255, 0.7)"};
  color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#0f172a")};
  backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);     
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  opacity: 0;
  transform: translateY(10px);

  transition:
    opacity 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.2s ease,
    margin 0.3s ease;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }

  &.fade-out {
    opacity: 0;
    transform: translateY(10px);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  }
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(255, 255, 255, 0.15);
  color: #f87171;
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  cursor: pointer;
  font-size: 15px;
  line-height: 22px;
  padding: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    color: #ef4444;
  }
`;

const WeatherPage = ({ cities, removeCity, darkMode}: Props) => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [removing, setRemoving] = useState<string | null>(null);
  const handleRemove = (city: string) => {
    setRemoving(city);
    setTimeout(() => removeCity(city), 300);
  }

  if (city) {
    return (
      <section>
        <button onClick={() => navigate("/")}>+ Add city</button>
        <h1>Weather in {decodeURIComponent(city)}</h1>

        <CardsWrapper>
          <WeatherDetails city={city} darkMode={darkMode} />
        </CardsWrapper>
      </section>
    );
  }

  return (
    <section>
      <button onClick={() => navigate("/")}>+ Add city</button>

      {cities.length === 0 && <p>No cities added yet.</p>}

      <CardsWrapper>
        {cities.map((c) => (
          <Card key={c} darkMode={darkMode} className={removing === c ? "fade-out" : "fade-in"}>
            <RemoveButton onClick={() => handleRemove(c)}>×</RemoveButton>
            <h2>Weather in {c}</h2>
            <WeatherDetails city={c} darkMode={darkMode} />
          </Card>
        ))}
      </CardsWrapper>
    </section>
  );
};

export default WeatherPage;
