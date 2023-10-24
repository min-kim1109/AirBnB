import { useState } from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { getSpotThunk } from "../../store/spots"
import { createReviewThunk } from "../../store/reviews"

// defines functional component PostReviews that takes in spot and user props as arguments
const PostReviews = ({ spot, user }) => {
    // used to dispatch actions to the Redux store
    const dispatch = useDispatch();

    // useModal hook used to access the exitModal function (close/exit a modal/window)
    const { exitModal } = useModal();

    // Piece of component state named text and a function to update the state (empty string)
    const [text, setText] = useState("");

    // Create state variable stars with initial value of 1, allow users to select number of stars
    const [stars, setStars] = useState(1);

    // Manage errors, starts off as empty object, used to store display validation errors
    const [errors, setErrors] = useState({});

    // Used to handle error responses in a component
    const [serverError, setServerError] = useState(null)



    const handleSubmit = async (e) => {
        // prevent default behavior of an event
        e.preventDefault();
        // sets error state to empty object
        setErrors({});
        // used to clear any previous error messages / responses
        setServerError(null);

        // data structure representing info needed to post a review
        // uses spotId/userId taken from spot and user props
        // review text and stars value taken from component's state
        const payload = {
            spotId: spot.id,
            userId: user.id,
            review: text, stars,
        };

        try {
            // dispatches action Redux, action created by thunk action creator
            // passes the payload object and spot.id as its arguments
            await dispatch(createReviewThunk(payload, spot.id))

            // uses getSpotThunk action creator to retrieve info about specific
            // spot, passes the spot.id as an argument indicicating which spot data
            // to fetch
            await dispatch(getSpotThunk(spot.id))

            // closes modal window
            exitModal();

            // used to handle errors that might occur during execution of try block
        } catch (error) {
            //informs user that an error occured when attempting to submit
            setServerError("An error occured while submitting your review.")
        }
    };

    // used to update stars state variable when user hovers over a star
    const starHandler = (rating) => {
        setStars(rating);
    };

    return (
        <div className="review-modal-container">
            <form className="submit-review-form" onSubmit={handleSubmit}>
                <div className="review-container">
                    <h2>How was your stay?</h2>
                    {/* conditional rendering statement, checks if serverError state
                    variable has a truthy value */}
                    {serverError && <p className="server-error">{serverError}</p>}

                    <textarea
                        className="review-textarea"
                        placeholder="Leave your review here..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="stars-container">
                        <div className="stars-icons-rating">
                            {/* array of star rating elements
                            iterates over 1-5 and generates star elements based on
                            rating values */}
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <div key={rating}
                                    // if rating is less than or equal to current value of
                                    // the stars state variable we get filled star otherwise
                                    // it shows empty star
                                    className={rating <= stars ? "filled" : "empty"}
                                    onMouseEnter={() => starHandler(rating)}
                                    onMouseLeave={() => starHandler(stars)}
                                    onClick={() => setStars(rating)}
                                >
                                    {/* i element displays either filled solid star or empty based on
                                    whether rating is less than or equal to the stars value */}
                                    <i className={rating <= stars ? "fa-solid fa-star" : "fa-regular fa-star"}></i>
                                </div>
                            ))}
                        </div>
                        <label className="star-label">Stars</label>
                    </div>

                    <button className="submit-review-button"
                        type="submit"
                        // condition to check if there are errors stored in the errors object
                        // if errors condition evaluates to true and button is disabled
                        // not stars checks if stars state variable is falsy, if the user
                        // hasn't selected a star rating, this condition evaluates to true
                        //  text.length checks for review text. if it's too short button is
                        // disabled
                        disabled={Object.keys(errors).length > 0 || !stars || text.length < 10}
                    >
                        Submit Your Review
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PostReviews;
