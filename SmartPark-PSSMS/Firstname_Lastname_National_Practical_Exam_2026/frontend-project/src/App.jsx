import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ParkingSlots from './pages/ParkingSlots';
import Entry from './pages/Entry';
import Exit from './pages/Exit';
import Reports from './pages/Reports';

const PrivateRoute = ({ children }) => {
  // Check for token instead of user object for stricter check
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/slots" element={<PrivateRoute><ParkingSlots /></PrivateRoute>} />
        <Route path="/entry" element={<PrivateRoute><Entry /></PrivateRoute>} />
        <Route path="/exit" element={<PrivateRoute><Exit /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
