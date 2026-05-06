import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #1e293b;
  color: #f1f5f9;
  border: 1px solid #334155;
  font-size: 1rem;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.4);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.2rem;
  border-radius: 0.5rem;
  background: #38bdf8;
  color: #0f172a;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #7dd3fc;
  }
`;

const Suggestions = styled.ul`
  position: absolute;
  top: 110%;
  left: 0;
  width: calc(100% - 6rem);
  background: #1e293b;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  margin: 0;
  list-style: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  color: #e5e7eb;

  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

type Props = {
  addCity: (city: string) => void;
};

const SearchBar = ({ addCity }: Props) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchSuggestions = async (value: string) => {
    if (value.length < 1) {
      setSuggestions([]);
      return;
    }

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
    );

    const data = await res.json();
    setSuggestions(data);
  };

  const handleChange = (value: string) => {
    setCity(value);
    fetchSuggestions(value);
  };

  const handleSelect = (name: string) => {
    setCity(name);
    setSuggestions([]);
    addCity(name);
    navigate("/weather");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    addCity(city.trim());
    navigate("/weather");
  };

  return (
    <Wrapper as="form" onSubmit={handleSubmit}>
      <div style={{ position: "relative", flex: 1 }}>
        <Input
          value={city}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search for a city..."
        />

        {suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((s) => (
              <SuggestionItem
                key={`${s.name}-${s.lat}`}
                onClick={() => handleSelect(s.name)}
              >
                {s.name}, {s.country}
              </SuggestionItem>
            ))}
          </Suggestions>
        )}
      </div>
      <Button type="submit">Search</Button>
    </Wrapper>
  );
};

export default SearchBar;
