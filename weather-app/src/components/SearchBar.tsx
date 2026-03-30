import {FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Form = styled.form`
display: flex;
gap: 0.5rem;
margin-bottom: 1.5rem;
`;

const Input = styled.input`
flex: 1;
padding: 0.75rem 1rem;
border-radius: 0.5rem;
border:none;
font-size: 1rem;
`;

const Button = styled.button`
padding: 0.75rem 1.2rem;
border-radius: 0.5rem;
border: none;
background: #38bdf8;
color: #0f172a;
font-weight: 600;
cursor: pointer;
`;

const SearchBar = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!city.trim()) return;
        navigate(`/weather/${encodeURIComponent(city.trim())}`);
    };

    return (
        <Form onSubmit = {handleSubmit}>
            <Input
                placeholder="Search for a city (e.g., Göteborg)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <Button type="submit">Search</Button>
        </Form>
    );
}

export default SearchBar;
