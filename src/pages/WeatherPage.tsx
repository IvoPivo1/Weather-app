import { useParams } from "react-router-dom";
import WeatherDetails from "../components/WeatherDetails";

const WeatherPage = () => {
    const { city } = useParams<{ city: string }>();

    if (!city) return <p>City not specified</p>;

    return (
        <section>
            <h1>Weather in {decodeURIComponent(city)}</h1>
            <WeatherDetails city={city} />
        </section>
    );
};

export default WeatherPage;