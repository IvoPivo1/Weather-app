import  { ReactNode } from "react";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
min-height: 100vh;
background: linear-gradient(211deg,rgba(0, 44, 125, 1) 17%, rgba(0, 61, 94, 1) 48%, rgba(10, 149, 255, 1) 100%);
color: #e5e7eb;
display: flex;
flex-direction: column;
`;

const Main = styled.main`
flex: 1;
max-width: 800px;
margin: 0 auto;
padding: 2rem 1rem 3rem;
font-family: 'Inter', sans-serif;
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