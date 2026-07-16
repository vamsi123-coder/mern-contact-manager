import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ userName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <span className="navbar-title">📋 Contact Manager</span>
            <div className="navbar-right">
                <span className="navbar-user">👤 {userName}</span>
                <button className="btn-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
