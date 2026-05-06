import { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div<{ darkMode: boolean }>`
  min-height: 100vh;
  background: ${({ darkMode }) =>
    darkMode
      ? "linear-gradient(211deg,rgba(0, 44, 125, 1) 17%, rgba(0, 61, 94, 1) 48%, rgba(10, 149, 255, 1) 100%)"
      : "linear-gradient(180deg, #6198ff 0%, #ffffff 100%)"};
  color: ${({ darkMode }) => (darkMode ? "#e5e7eb" : "#0f172a")};
  transition:
    background 0.4s ease,
    color 0.4s ease;
  display: flex;
  flex-direction: column;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const DMSwitch = styled.div<{ darkMode: boolean }>`
  width: 52px;
  height: 28px;
  background: ${({ darkMode }) => (darkMode ? "#4b5563" : "#d1d5db")};
  border-radius: 999px;
  padding: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
`;
const Knob = styled.div<{ darkMode: boolean }>`
  width: 22px;
  height: 22px;
  background: white;
  border-radius: 50%;
  transform: ${({ darkMode }) =>
    darkMode ? "translateX(24px)" : "translateX(0)"};
  transition: transform 0.3s ease;
`;

const Main = styled.main`
  flex: 1;
  margin: 0 auto;
  max-width: 330px;
   @media (min-width: 600px) {
    max-width: 700px; /* iPad */
  }

  @media (min-width: 1024px) {
    max-width: 800px; /* desktop */
  }
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
    <ToggleWrapper>
      <DMSwitch darkMode={darkMode} onClick={() => setDarkMode(!darkMode)}>
        <Knob darkMode={darkMode} />
      </DMSwitch>
    </ToggleWrapper>

    <Main>{children}</Main>
  </Wrapper>
);

export default Layout;
