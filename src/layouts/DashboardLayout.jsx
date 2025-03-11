import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';


const DashboardLayout = () => {
  return (
    
    <>
    <Navbar />
    <div className="container">
      <Logo />
      <Outlet />
    </div>
    </>
    
  )
}

export default DashboardLayout