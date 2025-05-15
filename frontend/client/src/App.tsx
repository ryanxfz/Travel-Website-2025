import {Routes, Route, BrowserRouter} from 'react-router-dom'
//import HomePage from './pages/HomePage'
import TravelPage from './pages/travelPage'
//import {CreateDestinationPage} from './pages/createDestinationpage'
import { DestinationsPage } from './pages/destinationPage'
//import Navbar from './components/Navbar'
import './App.css'
import { CreateDestinationPage } from './pages/createDestinationPage';
import TravelForm from './components/travel/travelForm';
import TravelDetail from './components/travel/travelDetail';


function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/new" element={<CreateDestinationPage />} />
          <Route path="/travels" element={<TravelPage />} />
          <Route path="/travels/new" element={<TravelForm />} />
          <Route path="/travels/:travelId" element={<TravelDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
