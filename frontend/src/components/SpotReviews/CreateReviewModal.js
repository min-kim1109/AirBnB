import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getSpotThunk } from "../../store/spots";
import { createReviewThunk } from "../../store/reviews";
import "./SpotReviews.css";

export const CreateReviewModal = ({ spot, user }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [stars, setStars] = useState(null);
    const [activeRating, setActiveRating] = useState(null);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        const errors = {};

        if (stars < 1) errors.stars = "Please add star rating.";
        if (review.length < 10)
            errors.review = "Review must be at least 10 characters long";

        setErrors(errors);
    }, [review, stars]);

    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = { stars, review };
        const spotId = spot.id;

        dispatch(createReviewThunk(newReview, spotId, user))
            .then(() => dispatch(getSpotThunk(spot.id)))
            .then(() => closeModal())
            .catch((error) => {
                setServerError(error);
            });
    };

    return (
        <div className="review-modal-content">
            <form className="submit-review-form" onSubmit={handleSubmit}>
                <div className="review-container">
                    <h2>How was your stay?</h2>

                    {serverError && <p className="server-error">{serverError}</p>}

                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Leave your review here..."
                    />

                    <div className="stars-container">
                        <div className="star-icons">
                            <div
                                className={activeRating >= 1 ? "filled" : "empty"}
                                onMouseEnter={() => setActiveRating(1)}
                                onMouseLeave={() => setActiveRating(stars)}
                                onClick={() => setStars(1)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div
                                className={activeRating >= 2 ? "filled" : "empty"}
                                onMouseEnter={() => setActiveRating(2)}
                                onMouseLeave={() => setActiveRating(stars)}
                                onClick={() => setStars(2)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div
                                className={activeRating >= 3 ? "filled" : "empty"}
                                onMouseEnter={() => setActiveRating(3)}
                                onMouseLeave={() => setActiveRating(stars)}
                                onClick={() => setStars(3)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div
                                className={activeRating >= 4 ? "filled" : "empty"}
                                onMouseEnter={() => setActiveRating(4)}
                                onMouseLeave={() => setActiveRating(stars)}
                                onClick={() => setStars(4)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div
                                className={activeRating >= 5 ? "filled" : "empty"}
                                onMouseEnter={() => setActiveRating(5)}
                                onMouseLeave={() => setActiveRating(stars)}
                                onClick={() => setStars(5)}
                            >
                                <i className="fa-solid fa-star"></i>
                            </div>
                        </div>
                        <label className="star-label">Stars</label>
                    </div>

                    <button
                        className="submit-review-button"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={
                            Object.values(errors).length > 1 || !stars || review.length < 10
                        }
                    >
                        Submit Your Review
                    </button>
                </div>
            </form>
        </div>
    );
};
