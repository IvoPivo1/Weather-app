import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path = '/' element={<HomePage />} />
        <Route path = '/weather/:city' element={<WeatherPage />} />
      </Routes>
    </Layout>
  );
}

export default App;