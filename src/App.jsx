import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add from './components/Add.jsx'; // Example component
import Home from './components/Home.jsx';
import LoginPage from './components/LoginPage.jsx';
import DashboardAdmin from './components/admin/Dashboard.jsx';
import useAuthMiddleware from './middleware/AuthMiddleware.js';
import AdminLayout from './components/AdminLayout.jsx';
import InviteWriter from './pages/inviteWriter.jsx';

const PrivateRoute = ({ children }) => {
  useAuthMiddleware(); // Check authentication before rendering the children

  return children; // If authenticated, render children, else redirect happens in the hook
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<Add />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/invite" element={<InviteWriter />} />
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
