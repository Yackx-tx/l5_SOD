import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Cars from './pages/Cars';
import Packages from './pages/Packages';
import ServiceRecords from './pages/ServiceRecords';
import Payments from './pages/Payments';
import Reports from './pages/Reports';

const AppContent = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-emerald-800 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {user && <Navbar />}
      <main>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

          {/* Protected Routes */}
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/cars" element={user ? <Cars /> : <Navigate to="/login" />} />
          <Route path="/packages" element={user ? <Packages /> : <Navigate to="/login" />} />
          <Route path="/services" element={user ? <ServiceRecords /> : <Navigate to="/login" />} />
          <Route path="/payments" element={user ? <Payments /> : <Navigate to="/login" />} />
          <Route path="/reports" element={user ? <Reports /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
