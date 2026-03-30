import styled from "styled-components";
import type { WeatherResponse } from "../api/weatherApi";
const Card = styled.article`
background: rgba(15, 23, 42, 0.9);
border-radius: 1rem;
padding: 1.5rem;
margin-top: 1rem;
`;

type Props = {
    data: WeatherResponse;
};

const WeatherCard = ({ data }: Props) => {
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;

    return (
        <Card>
            <h2>{data.name}</h2>
            <p>{description}</p>
            <p>Temperature: {Math.round(data.main.temp)}°C</p>
            <p>Feels like: {Math.round(data.main.feels_like)}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind speed: {data.wind.speed} m/s</p>
            {icon && (
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
            />
            )}
        </Card>
    );
};

export default WeatherCard;