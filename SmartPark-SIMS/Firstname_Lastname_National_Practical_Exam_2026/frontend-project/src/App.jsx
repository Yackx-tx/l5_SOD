import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SpareParts from './pages/SpareParts';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import Reports from './pages/Reports';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><SpareParts /></PrivateRoute>} />
        <Route path="/stock-in" element={<PrivateRoute><StockIn /></PrivateRoute>} />
        <Route path="/stock-out" element={<PrivateRoute><StockOut /></PrivateRoute>} />
        <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
