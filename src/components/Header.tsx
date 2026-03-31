import { Link } from "react-router-dom";
import styled from "styled-components";

const Bar = styled.header`
padding: 1rem;
border-bottom: 1px solid #1f2937;
display: flex;
justify-content: center;
`;

const Title = styled(Link)`
font-size: 2.1rem;
font-weight: 700;
color: #e5e7eb;
text-decoration: none;
font-family: 'Inter', sans-serif;
`;

const Header = () => (
    <Bar>
        <Title to="/">WeatherNow</Title>
    </Bar>
);

export default Header;
