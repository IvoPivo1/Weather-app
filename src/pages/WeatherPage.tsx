import { useParams, useNavigate } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";
import Forecast from "../components/Forecast";
import styled from "styled-components";
import { useState } from "react";
import type { WeatherResponse } from "../api/weatherApi";
import { weatherIcons } from "../weatherImages";

const getCustomIcon = (data: any) => {
  const description = data.weather[0].description.toLowerCase();
  const main = data.weather[0].main;
  return weatherIcons[description] || weatherIcons[main];
};

type Props = {
  cities: string[];
  removeCity: (city: string) => void;
  darkMode: boolean;
};

/* -------------------- MOBILE FRIENDLY -------------------- */

const CityContainer = styled.section<{ darkMode: boolean }>`
  padding: 1rem;
  max-width: 500px;

@media (min-width: 730px) {
  max-width: 700px; /* iPad */
}

@media (min-width: 1024px) {
  max-width: 800px; /* desktop */
}

  margin: 0 auto;
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#0f172a")};
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  background: rgba(255,255,255,0.2);
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
`;

const Hero = styled.div`
  text-align: center;
  margin-top: 0.5rem;

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.2rem;
  }

  p {
    font-size: 1rem;
    opacity: 0.8;
  }

  img {
    width: 70px;
    margin: 0.8rem auto;
  }

  h2 {
    font-size: 2.2rem;
    margin-top: 0.3rem;
  }

  @media (min-width: 600px) {
    h1 { font-size: 2.4rem; }
    p { font-size: 1.3rem; }
    img { width: 120px; }
    h2 { font-size: 3.5rem; }
  }
`;

const DetailsGrid = styled.div`
    display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.7rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
    max-width: 400px;
  }
`;

const DetailBoxWrapper = styled.div`
  padding: 0.6rem;
  border-radius: 0.6rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  text-align: center;

  h3 {
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
  }

  p {
    font-size: 1rem;
    font-weight: bold;
  }

  /*MOBIL-LÄGE */
  @media (max-width: 480px) {
    padding: 0.4rem;

    h3 {
      font-size: 0.75rem;
    }

    p {
      font-size: 0.85rem;
    }
  }
`;


const DetailBox = ({ title, value }: { title: string; value: string }) => (
  <DetailBoxWrapper>
    <h3>{title}</h3>
    <p>{value}</p>
  </DetailBoxWrapper>
);



const MapFrame = styled.iframe`
  width: 100%;
  max-width: 100%;
  height: 180px;
  border-radius: 1rem;
  border: none;
  margin-top: 1rem;

  /* iPad */
  @media (min-width: 600px) {
    height: 260px;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    height: 350px;
  }
`;

/* -------------------- MULTI CITY -------------------- */

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
`;

const Card = styled.div<{ darkMode: boolean }>`
  position: relative;
  background: ${({ darkMode }) =>
    darkMode ? "rgba(30, 41, 59, 0.55)" : "rgba(255, 255, 255, 0.7)"};
  color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#0f172a")};
  backdrop-filter: blur(12px);
  padding: 1rem;
  border-radius: 0.75rem;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;

/* -------------------- COMPONENT -------------------- */

const WeatherPage = ({ cities, removeCity, darkMode }: Props) => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<WeatherResponse | null>(null);

  /* -------------------- SINGLE CITY -------------------- */
  if (city) {
    return (
      <CityContainer darkMode={darkMode}>
        <BackButton onClick={() => navigate("/weather")}>← Back</BackButton>

        <WeatherDetails
          city={city}
          darkMode={darkMode}
          onDataLoaded={(d) => setSelectedData(d)}
        />

        {selectedData && (
          <>
            <Hero>
              <h1>{selectedData.name}</h1>
              <p>{selectedData.weather[0].description}</p>
              <img src={getCustomIcon(selectedData)} alt="weather icon" />
              <h2>{Math.round(selectedData.main.temp)}°C</h2>
            </Hero>

            <DetailsGrid>
              <DetailBox title="Feels Like" value={`${Math.round(selectedData.main.feels_like)}°C`} />
              <DetailBox title="Humidity" value={`${selectedData.main.humidity}%`} />
              <DetailBox title="Pressure" value={`${selectedData.main.pressure} hPa`} />
              <DetailBox title="Visibility" value={`${selectedData.visibility} m`} />
              <DetailBox title="Wind Speed" value={`${selectedData.wind.speed} m/s`} />
              <DetailBox title="Wind Gust" value={`${selectedData.wind.gust ?? "N/A"} m/s`} />
              <DetailBox title="Sunrise" value={new Date(selectedData.sys.sunrise * 1000).toLocaleTimeString()} />
              <DetailBox title="Sunset" value={new Date(selectedData.sys.sunset * 1000).toLocaleTimeString()} />
            </DetailsGrid>

            <h2 style={{ marginTop: "1.5rem", fontSize: "1.3rem" }}>Map</h2>
            <MapFrame
              loading="lazy"
              src={`https://www.google.com/maps?q=${selectedData.coord.lat},${selectedData.coord.lon}&z=11&output=embed`}
            />

            <Forecast city={selectedData.name} darkMode={darkMode} />
          </>
        )}
      </CityContainer>
    );
  }

  /* -------------------- MULTI CITY -------------------- */
  return (
    <section>
      <button onClick={() => navigate("/")}>+ Add city</button>

      {cities.length === 0 && <p>No cities added yet.</p>}

      <CardsWrapper>
        {cities.map((c) => (
          <Card key={c} darkMode={darkMode}>
            <RemoveButton onClick={() => removeCity(c)}>×</RemoveButton>
            <h2>Weather in {c}</h2>
            <WeatherDetails city={c} darkMode={darkMode} />
          </Card>
        ))}
      </CardsWrapper>
    </section>
  );
};

export default WeatherPage;
