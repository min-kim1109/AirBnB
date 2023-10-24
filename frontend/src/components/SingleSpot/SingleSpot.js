import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpotThunk } from '../../store/spots';
import { getSpotReviewsThunk } from '../../store/reviews';
import { SpotReview } from '../SpotReviews/SpotReviews';
import './SingleSpot.css';

function SingleSpot() {
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot);
    const { spotId } = useParams();

    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId));
        dispatch(getSpotThunk(spotId));
    }, [dispatch, spotId]);

    if (!spot || Object.keys(spot).length === 0) {
        return null;
    }

    const reserveButton = (e) => {
        e.preventDefault();
        alert('Feature Coming Soon...');
    };

    return (
        <div className='spots-details-container'>
            <div className='name-location-container'>
                <h2>{spot.name}</h2>
                <h4>{`${spot.city}, ${spot.state}, ${spot.country}`}</h4>
            </div>
            <div className='spot-images-container'>
                {spot.SpotImages &&
                    spot.SpotImages.map((image, index) => (
                        <img src={image.url} key={image.id} className={`image${index + 1}`} alt={`Spot Image ${index + 1}`} />
                    ))}
            </div>
            <div className='host-container'>
                <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                <h4>{spot.description}</h4>
            </div>
            <div className='price-reserve-container'>
                <div className='price-info-container'>
                    <div className='price-container'>
                        <h4>${spot.price}</h4>
                    </div>
                    <div className='night-container'>
                        <h5>night</h5>
                    </div>
                    <div className='ratings-container'>
                        <i className='fa-solid fa-star'></i>
                        {!spot.avgStarRating ? <span>NEW</span> : spot.avgStarRating.toFixed(1)}
                        {spot.numReviews ? '·' : <p></p>}
                        {spot.numReviews ? (
                            `${spot.numReviews} ${spot.numReviews > 1 ? 'reviews' : 'review'}`
                        ) : (
                            <p></p>
                        )}
                    </div>
                </div>
                <button className='reserve-button' onClick={reserveButton}>Reserve</button>
            </div>
            <SpotReview />
        </div>
    );
}

export default SingleSpot;
