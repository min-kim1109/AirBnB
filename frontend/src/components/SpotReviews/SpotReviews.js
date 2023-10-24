import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import PostReview from './PostReview';
import DeleteReview from './DeleteReview';


export const SpotReview = () => {
    // dispatches actions to the Redux store
    const dispatch = useDispatch();

    // grab spotId from URL parameters
    const { spotId } = useParams();

    // useSelector hook used to extract data from Redux store
    // selecting singleSpot, user, reviews slice
    const spot = useSelector((state) => state.spots.singleSpot);
    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.spot.Reviews);

    // initiliaze two pieces of local state using useState hook
    const [isLoaded, setIsLoaded] = useState(false);
    const [key, setKey] = useState(0);

    // triggers effect when component renders
    // dispatches thunk action with spotId and sets isLoaded to true
    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    // function that takes date parameter and formats it to a more readable format
    const createDate = (date) => {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        const newDate = new Date(date);
        const month = months[newDate.getMonth()];
        const year = newDate.getFullYear();

        return `${month} ${year}`;
    };

    // variable that is an array of reviews sorted by their createdAt property in
    // descending order. If reviews it not an array, it defaults to an empty array
    const sortedReviews = Array.isArray(reviews)
        ? [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    // updates the key state variable by incrementing it by 1
    // useful for triggering a re-render of certain components when a new review is submitted
    const handleReviewSubmitted = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return isLoaded && (
        <div key={key}>
            <div>
                {console.log(sortedReviews, 'reviews!!!!')}
                {sortedReviews.length ? (
                    <div>
                        <div className="star-review-container">
                            <i className="fa-solid fa-star"></i>
                            {Number(spot.avgStarRating).toFixed(1)} · {spot.numReviews}{" "}
                            {spot.numReviews > 1 ? 'Reviews' : 'Review'}
                            <div className="post-button">
                                {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
                                    <OpenModalButton
                                        buttonText="Post Your Review"
                                        modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
                                    />
                                )}
                            </div>
                        </div>
                        {sortedReviews.map((review) => (
                            <div key={review.id}>
                                <div className="review-container">
                                    <h3 className="user-name">{review?.User?.firstName}</h3>
                                    <h4 className="review-date">{createDate(review.createdAt)}</h4>
                                    <p className="review-description">{review.review}</p>

                                    <div className="delete-button">
                                        {review.userId === user?.id && (
                                            <OpenModalButton
                                                buttonText="Delete"
                                                modalComponent={
                                                    <DeleteReview reviewId={review.id} spotId={spot.id} />
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="new-container">
                            <i className="fa-solid fa-star"></i>
                            New
                            <div className="post-review-button">
                                {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
                                    <OpenModalButton
                                        buttonText="Post Your Review"
                                        modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
                                    />
                                )}
                            </div>
                        </div>
                        {user && !sortedReviews.find((review) => review.userId === user.id) && spot.ownerId !== user?.id && (
                            <h3 className="be-the-first-text">
                                Be the first to post a review!
                            </h3>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpotReview;
