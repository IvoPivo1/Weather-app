import  { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
min-height: 100vh;
background: linear-gradient(180deg, #0f172a, #1e293b);
color: #e5e7eb;
display: flex;
flex-direction: column;
`;

const Main = styled.main`
flex: 1;
max-width: 800px;
margin: 0 auto;
padding: 2rem 1rem 3rem;
`;

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children}: LayoutProps) => (
    <Wrapper>
        <Header />
        <Main>{children}</Main>
    </Wrapper>
);

export default Layout;