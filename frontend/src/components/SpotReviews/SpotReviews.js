import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSpotReviewsThunk } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton';
import PostReview from './PostReview';
import DeleteReview from './DeleteReview';

export const SpotReview = () => {
    // Dispatch actions to the Redux store
    const dispatch = useDispatch();

    // Grab spotId from URL parameters
    const { spotId } = useParams();

    // Use the useSelector hook to extract data from the Redux store
    const spot = useSelector((state) => state.spots.singleSpot);
    const user = useSelector((state) => state.session.user);
    const reviews = useSelector((state) => state.reviews.spot.Reviews);

    // Initialize two pieces of local state using the useState hook
    const [isLoaded, setIsLoaded] = useState(false);
    const [key, setKey] = useState(0);

    // Trigger an effect when the component renders
    // Dispatch a thunk action with spotId and set isLoaded to true
    useEffect(() => {
        dispatch(getSpotReviewsThunk(spotId)).then(() => setIsLoaded(true));
    }, [dispatch, spotId]);

    // Function that takes a date parameter and formats it to a more readable format
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

    // Variable that is an array of reviews sorted by their createdAt property in
    // descending order. If reviews are not an array, it defaults to an empty array
    const sortedReviews = Array.isArray(reviews)
        ? [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : [];

    // Update the key state variable by incrementing it by 1
    // Useful for triggering a re-render of certain components when a new review is submitted
    const handleReviewSubmitted = () => {
        setKey((prevKey) => prevKey + 1);
    };

    return (
        <div key={key}>
            <div>
                {isLoaded ? (
                    <div>
                        <div className="star-review-container">
                            <i className="fa-solid fa-star"></i>
                            {Number(spot?.avgStarRating).toFixed(1)} · {spot?.numReviews}{" "}
                            {spot?.numReviews > 1 ? 'Reviews' : 'Review'}
                            <div className="post-button">
                                {user && !sortedReviews.find((review) => review.userId === user.id) && spot?.ownerId !== user?.id && (
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
                                {user && !sortedReviews.find((review) => review.userId === user.id) && spot?.ownerId !== user?.id && (
                                    <OpenModalButton
                                        buttonText="Post Your Review"
                                        modalComponent={<PostReview spot={spot} user={user} onReviewSubmitted={handleReviewSubmitted} />}
                                    />
                                )}
                            </div>
                        </div>
                        {user && !sortedReviews.find((review) => review.userId === user.id) && spot?.ownerId !== user?.id && (
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
