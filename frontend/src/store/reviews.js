import { csrfFetch } from "./csrf"

// Constants
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'

// POJO Action Creator
const getAllReviews = reviews => {
    return {
        type: GET_ALL_REVIEWS,
        reviews
    }
}

//! Thunks
// Thunk action to get all reviews
export const getSpotReviewsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const review = await response.json()
        dispatch(getSpotReviewsThunk(review))
        return review
    }
}

// Initial state
const initialState = { reviews: {} }

//! Reducer
const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_REVIEWS:
            newState = { ...state, reviews: {} }
            action.reviews.Reviews.forEach(review => {
                newState.reviews[review.id] = review
            })
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
