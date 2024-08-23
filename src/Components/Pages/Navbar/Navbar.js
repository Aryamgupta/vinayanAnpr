import React from 'react'
import vinayanlogo from '../../../Images/logo.svg';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { AllState } from '../../Context/Context';

const Navbar = () => {
  const handleRefresh = () => {
    window.location.reload();
  };
  const { setSingleView } = AllState();
  return (
    <div className='mainNavBar'>
      <img src={vinayanlogo}  onClick={()=>{handleRefresh()}} style={{cursor:"pointer" , height:"60px"}}/>
      <div className='allLinks'>
        <NavLink to="/dashboard"
          onClick={() => {
            setSingleView(null);
          }}
          className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')}>
          Dashboard
        </NavLink>
        <NavLink to="/records" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')} onClick={() => {
          setSingleView(null);
        }}>
          Records
        </NavLink>
        <NavLink to="/confriguations" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')} onClick={() => {
          setSingleView(null);
        }}>
          Confriguations
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'navLinkk-selected' : 'navLinkk')} onClick={() => {
          setSingleView(null);
        }}>
          Profile
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
