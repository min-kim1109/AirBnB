// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <ul id='logo-container'>
            <NavLink exact to='/'>
                <div id='logo-name-container'>
                    <i class="fa-brands fa-airbnb"></i>
                    <h1>MapleBnB</h1>
                </div>
            </NavLink>

            {isLoaded && (
                <div id='nav-container'>
                    <i className="fa-solid fa-bars"></i>
                    <ProfileButton user={sessionUser} />
                </div>
            )}
        </ul>
    );
}

export default Navigation;
