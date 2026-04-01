import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div<{ darkMode: boolean }>`
  min-height: 100vh;
  background: ${({ darkMode }) =>
    darkMode
      ? "linear-gradient(211deg,rgba(0, 44, 125, 1) 17%, rgba(0, 61, 94, 1) 48%, rgba(10, 149, 255, 1) 100%)"
      : "#f1f5f9"};
  color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#0f172a")};
  display: flex;
  flex-direction: column;
  transition:
    background 0.3s ease,
    color 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem 3rem;
  font-family: "Inter", sans-serif;
`;

type LayoutProps = {
  children: ReactNode;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
};

const Layout = ({ children, darkMode, setDarkMode }: LayoutProps) => (
  <Wrapper darkMode={darkMode}>
    <Header />
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        margin: "1rem auto",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        cursor: "pointer",
        background: darkMode ? "#e5e7eb" : "#1e293b",
        color: darkMode ? "#1e293b" : "#e5e7eb",
        transition: "0.3s",
      }}
    >
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
    <Main>{children}</Main>
  </Wrapper>
);

export default Layout;
