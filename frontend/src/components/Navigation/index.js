import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const airbnbLogo = 'https://i.imgur.com/Yiykjlm.png'

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='navigationBar'>
            <NavLink exact to="/" className='home-button' >
                <img className='logo' src={airbnbLogo} />
            </NavLink>
            {isLoaded && (
                <ProfileButton className='profileButton' user={sessionUser} />

            )}
        </div>
    );
}

export default Navigation;
