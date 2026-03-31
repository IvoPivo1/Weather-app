import {useEffect, useState} from 'react';
import styled from 'styled-components';
import  { getCurrentWeather, WeatherResponse } from '../api/weatherApi';
import WeatherCard from './WeatherCard';

const Message = styled.p`
margin-top: 1rem;
`;

type Props = {
    city: string;
};

const WeatherDetails = ({ city }: Props) => {
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
                if (!cancelled) setData(result);
            } catch (err: any) {
                if (!cancelled){
                    setError(err.message ?? "Something went wrong");
                    setData(null);
                }
                }finally {
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

    return <WeatherCard data={data} />;
};

export default WeatherDetails;