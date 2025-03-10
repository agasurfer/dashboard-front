import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import BucketsPage from './pages/BucketsPage';
import ContainersPage from './pages/ContainersPage';
import FootprintPage from './pages/FootprintPage';
import VolumesPage from './pages/VolumesPage';


const App = () => {
  return (
  
    <Router>
      <Routes>
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="/footprint" element={<FootprintPage />} /> 
          <Route path="/containers" element={<ContainersPage />} />
          <Route path="/buckets" element={<BucketsPage />} />
          <Route path="/volumes" element={<VolumesPage />} />
        </Route>

    
      </Routes>
    </Router>
    
    
  )
}

export default App
