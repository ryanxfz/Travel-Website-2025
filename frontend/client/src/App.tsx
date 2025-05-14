import {Routes, Route, BrowserRouter} from 'react-router-dom'
//import HomePage from './pages/HomePage'
import TravelPage from './pages/travelPage'
//import {CreateDestinationPage} from './pages/createDestinationpage'
import { DestinationsPage } from './pages/destinationPage'
//import Navbar from './components/Navbar'
import './App.css'
import { CreateDestinationPage } from './pages/createDestinationPage';

function App(){
  // const testConnection = async () => {
  //   try {
  //     const response = await fetch('http://localhost:4000/api/destinations');
  //     const data = await response.json();
  //     console.log('API Response:', data);
  //   } catch (error) {
  //     console.error('API Error:', error);
  //   }
  // };
  // return (
  //   <div>
  //     {/* Your existing routes */}
  //     <button 
  //       onClick={testConnection}
  //       style={{ position: 'fixed', bottom: 20, right: 20 }}
  //     >
  //       Test API Connection
  //     </button>
  //   </div>
  // );
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-6">
        <Routes>
          <Route path="/destinations" element={<DestinationsPage />} />
          <Route path="/destinations/new" element={<CreateDestinationPage />} />
          <Route path="/travels" element={<TravelPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
