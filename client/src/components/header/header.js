import React from 'react';
import Navigation from '../navigation/navigation'
import './header.css'
import Auth from '../../utils/auth'

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <div className="nav">
            <Navigation/>
        </div>
    )
}

export default Header;