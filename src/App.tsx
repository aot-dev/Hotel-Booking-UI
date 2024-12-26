import './App.css';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import HotelListPage from "./pages/HotelListPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import UpdateBookingPage from './pages/UpdateBookingPage';
import Navbar from './components/NavBar';

function App() {
  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path="/" element={<HotelListPage />} />
      <Route path="/hotels" element={<HotelListPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/my-bookings" element={<MyBookingsPage />} />
      <Route path="/update" element={<UpdateBookingPage />} />
    </Routes>
  </Router>
  )
}

export default App
