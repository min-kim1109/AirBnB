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
            closeModal();

            // used to handle errors that might occur during execution of try block
        } catch (error) {
            //informs user that an error occured when attempting to submit
            setServerError("An error occured while submitting your review.")
        }
    }
}
