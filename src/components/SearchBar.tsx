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

type Props = {
  addCity: (city: string) => void;
};

const SearchBar = ({addCity}: Props) => {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    addCity(city.trim());
    navigate("/weather");
    };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city..."
      />
      <Button type="submit">Search</Button>
    </Wrapper>
  );
};

export default SearchBar;
