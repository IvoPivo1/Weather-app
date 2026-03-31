import { useParams, useNavigate } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";
import styled from "styled-components";

type Props = {
  cities: string[];
  removeCity: (city: string) => void;
};

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const Card = styled.div`
  position: relative;
   background: #1e293b;
  padding: 1rem;
  border-radius: 0.75rem;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  padding: 0;

  &:hover {
    background: #dc2626;
  }
`;

const WeatherPage = ({ cities, removeCity }: Props) => {
  const { city } = useParams();
  const navigate = useNavigate();

  if (city) {
    return (
      <section>
        <button onClick={() => navigate("/")}>+ Add city</button>
        <h1>Weather in {decodeURIComponent(city)}</h1>

        <CardsWrapper>
          <WeatherDetails city={city} />
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
          <Card key={c}>
            <RemoveButton onClick={() => removeCity(c)}>×</RemoveButton>
            <h2>Weather in {c}</h2>
            <WeatherDetails city={c} />
          </Card>
        ))}
      </CardsWrapper>
    </section>
  );
};

export default WeatherPage;
