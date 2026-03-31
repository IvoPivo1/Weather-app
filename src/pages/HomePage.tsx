import SearchBar from "../components/SearchBar";

const HomePage = ({ addCity}: { addCity: (city: string) => void }) => {
    return (
        <section>
            <h1>Check the weather</h1>
            <p>Enter a city name to see the current weather conditions.</p>
            <SearchBar addCity={addCity} />
        </section>
    );
};

export default HomePage;