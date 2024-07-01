import './App.css';
import NavBar from './components/NavBar';
import Booking from './screens/Booking';
import BookingDetails from './screens/BookingDetails';
import Home from './screens/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/book/:roomid/:fromdate/:todate" Component={Booking} />
          <Route path="/bookings" Component={BookingDetails} />
          <Route path="/home" Component={Home} />
        </Routes>

      </BrowserRouter>
 

    </div>
  );
}

export default App;
