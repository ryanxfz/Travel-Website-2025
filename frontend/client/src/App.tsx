import {Routes, Route} from 'react-router-dom'
//import HomePage from './pages/HomePage'
import TravelPage from './pages/travelPage'
//import DestinationPage from './pages/DestinationPage'
//import Navbar from './components/Navbar'
import './App.css'

function App(){
  return (
    <div className="app">
      <main>
        <Routes>
          {/*<Route path="/" element={<HomePage />} />*/}
          <Route path="/travels" element={<TravelPage />} />
          {/*<Route path="/destinations" element={<DestinationPage />} />*/}
        </Routes>
      </main>
    </div>
  )
}

export default App
