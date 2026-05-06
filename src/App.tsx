import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Layout from './components/Layout';
import { useState } from 'react';

function App() {
  const [cities, setCities] = useState<string[]>([]);

  const removeCity = (city: string) => {
    setCities((prev) => prev.filter((c) => c !== city));
  };

  const addCity = (city: string) => {
    setCities((prev) => [...prev, city]);
  };

  const [darkMode, setDarkMode] = useState(true);
  
  return (
    <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
      <Routes>
        <Route path='/' element={<HomePage addCity={addCity} />} />

        <Route
          path='/weather'
          element={<WeatherPage cities={cities} removeCity={removeCity} darkMode={darkMode} />}
        />

        {/* ⭐ SINGLE CITY ROUTE — DENNA SAKNAS HOS DIG */}
        <Route
          path='/weather/:city'
          element={<WeatherPage cities={cities} removeCity={removeCity} darkMode={darkMode} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
