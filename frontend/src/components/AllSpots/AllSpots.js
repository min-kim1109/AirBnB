import React from 'react';
// import OneSpot from '../OneSpot/OneSpot';
import './AllSpots.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getSpotsThunk } from '../../store/spots';

function AllSpots() {

    const dispatch = useDispatch();
    const objAllSpots = useSelector(state => state.spots);
    const arrAllSpots = Object.values(objAllSpots);
    console.log('arrAllSpots: ', arrAllSpots)

    useEffect(() => {
        dispatch(getSpotsThunk())
    }, [dispatch]);

    return (
        <div className='landingpage-container'>
            {arrAllSpots.map(spot => (
                <div key={`${spot.name}`} className='spot'>
                    <div className='image'><img src={spot.previewImage} alt='spotImg' /></div>
                    <div className='topRow'>
                        <span className='cityState'>{spot.city}, {spot.state}</span>
                        <span className='rating'><i className="fa-solid fa-star"></i>{spot.avgRating}</span>
                    </div>
                    <span className='price'>${spot.price}/night</span>
                </div>
            ))}
        </div>
    )
}

export default AllSpots
