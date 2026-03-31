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
  
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage addCity={addCity} />} />

        {/* Multi-city page */}
        <Route
          path='/weather'
          element={<WeatherPage cities={cities} removeCity={removeCity} />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
