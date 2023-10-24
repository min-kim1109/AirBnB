import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const airbnbLogo = 'https://cdn.discordapp.com/attachments/513986476783173643/1166487182899425370/image.png?ex=654aaad8&is=653835d8&hm=f9c0f0af56562467d42b81b4df063c7f34046d91713079687b5e808a94541618&'

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
