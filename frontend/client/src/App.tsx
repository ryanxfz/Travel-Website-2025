import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import TravelPage from './pages/travelPage'
import { DestinationsPage } from './pages/destinationPage'
import './App.css'
import { CreateDestinationPage } from './pages/createDestinationPage';
import TravelForm from './components/travel/travelForm';
import TravelDetail from './components/travel/travelDetail';
import EditDestinationForm from './components/destination/EditDestinationForm';
import EditTravelForm from './components/travel/editTravelForm';


function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white-50 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/travels" replace />}/>
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/new" element={<CreateDestinationPage />} />
          <Route path="/travels" element={<TravelPage />} />
          <Route path="/travels/new" element={<TravelForm />} />
          <Route path="/travels/:travelId" element={<TravelDetail />} />
          <Route path="/travels/:travelId/destinations/edit/:destinationId" element={<EditDestinationForm />} />
          <Route path="/travels/:travelId/edit" element={<EditTravelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
