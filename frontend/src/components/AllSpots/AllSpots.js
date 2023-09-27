import React from 'react';
// import OneSpot from '../OneSpot/OneSpot';
import './AllSpots.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotsThunk } from '../../store/spots';
import { NavLink } from 'react-router-dom'


function AllSpots() {

    // dispath is to interact with the store
    const dispatch = useDispatch();

    // useSelector selects store data objects
    const objAllSpots = useSelector(state => state.spots);

    // turns store data objects into an array
    const arrAllSpots = Object.values(objAllSpots);
    // console.log('arrAllSpots: ', arrAllSpots)

    // useEffect dispatches the thunk function called from store
    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    if (!arrAllSpots) return null;

    return (
        <div className='landing-page'>
            <div className='langing-page-container'>
                {arrAllSpots.map(spot => (
                    <NavLink key={`${spot.name}`} className='spot' to={`/spots/${spot.id}`}>
                        <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                        <div className='topRow'>
                            <span className='cityState'>{spot.city}, {spot.state}</span>
                            <span className='rating'><i className="fa-solid fa-star"></i>
                                {!spot.avgRating ? <span>NEW</span> : spot.avgRating.toFixed(1)}
                            </span>
                        </div>
                        <span className='price'>${spot.price}/night</span>
                        <div className='tooltip'>{spot.name}</div>
                    </NavLink>
                ))}

            </div>
        </div>
    )
}

export default AllSpots;
