// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserList from './pages/UserList.jsx';
import DBList from './pages/DBList.jsx';
import URLList from './pages/URLList.jsx';
import AddNewURL from './pages/AddNewURL.jsx';
import CronList from './pages/CronList.jsx';
import Backups from './pages/Backups.jsx';
import RDPListPage from './pages/RDPList.jsx';
import ServiceList from './pages/ServiceList.jsx';
import ServerDashboard from './pages/ServerDashboard.jsx';
import DatabaseDashboard from './pages/DbDashboard.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<Layout><UserList /></Layout>} />
        <Route path="/databases" element={<Layout><DBList /></Layout>} />
        <Route path="/urls" element={<Layout><URLList /></Layout>} />
        <Route path="/add-url" element={<Layout><AddNewURL /></Layout>} />
        <Route path="/cron" element={<Layout><CronList /></Layout>} />
        <Route path="/backups" element={<Layout><Backups /></Layout>} />
        <Route path="rdp-list" element={<Layout><RDPListPage /></Layout>} />
        <Route path="services" element={<Layout><ServiceList /></Layout>} />
        <Route path="server" element={<Layout><ServerDashboard /></Layout>} />
        <Route path="db" element={<Layout><DatabaseDashboard /></Layout>} />

      </Routes>
    </Router>
  );
};

export default App;
