import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  section {
  }
    
  button{
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
  }
`;
