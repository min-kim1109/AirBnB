import { csrfFetch } from "./csrf"

// Constants
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'

// POJO Action Creator
const getAllReviews = (review, spotId) => {
    return {
        type: GET_ALL_REVIEWS,
        review,
        spotId
    }
};

//! Thunks
// Thunk action to get all reviews
export const getSpotReviewsThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const review = await response.json()
        // console.log('review: ', review)
        dispatch(getAllReviews(review))
        return review
    } else {
        const errors = await response.json();
        return errors;
    }
}

// Initial state
const initialState = { spot: {}, user: {} }

//! Reducer
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_REVIEWS:
            newState = { ...state, spot: {} };

            action.review.Reviews.forEach(review => {

                newState.spot[review.id] = review
            })
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
