import { csrfFetch } from "./csrf"

// Constants
const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS'
const DELETE_REVIEWS = 'reviews/DELETE_REVIEW'

// POJO Action Creator
const getAllReviews = (review, spotId) => {
    return {
        type: GET_ALL_REVIEWS,
        review,
        spotId
    }
};

const deleteReview = reviewId => {
    return {
        type: DELETE_REVIEWS,
        reviewId
    }
}

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

// Thunk action to create a review
export const createReviewThunk = (review, spotId, user) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        });

        if (res.ok) {
            const newReview = await res.json();
            dispatch(getSpotReviewsThunk(spotId));
            // Handle the new review data as needed, e.g., show a success message or navigate to a different page.
        } else {
            const errors = await res.json();
            // Handle errors appropriately, e.g., show error messages to the user.
        }
    } catch (error) {
        console.error("Error creating review:", error);
        // Handle any unexpected errors.
    }
};

// Thunk action to delete a review
export const deleteReviewThunk = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId))
        return response
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

        case DELETE_REVIEWS:
            newState = { ...state, spot: { ...state.spot } }
            delete newState.spot[action.reviewId]
            return newState;

        default:
            return state;
    }
}

export default reviewsReducer;
