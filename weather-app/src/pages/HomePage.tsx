import SearchBar from "../components/SearchBar";

const HomePage = () => {
    return (
        <section>
            <h1>Check the weather</h1>
            <p>Enter a city name to see the current weather conditions.</p>
            <SearchBar />
        </section>
    );
};

export default HomePage;