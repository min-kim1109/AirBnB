import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
const GET_USER_SPOTS = 'spots/GET_USER_SPOTS';
const DELETE_SPOT = 'spots/DELETE_SPOT'

// POJO action creator
const getAllSpots = spot => {
    return {
        type: GET_ALL_SPOTS,
        spot
    }
};

const getASpot = spot => {
    return {
        type: GET_SPOT,
        spot
    }
};

const getAllUserSpots = spot => {
    return {
        type: GET_USER_SPOTS,
        spot
    }
};

const deleteASpot = spotId => {
    return { type: DELETE_SPOT, spotId }
}


// Thunk action to get all spots
export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)
    // console.log('response: ', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getAllSpots(spot))
        // console.log('spots', spot)
        return spot
    } else {
        const errors = await response.json();
        return errors
    }
};

// Thunk to GET a spot
export const getSpotThunk = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getASpot(spot))
        // console.log('getSpot: ', spot)
        return spot
    }
}

// Create Spot thunk
export const createSpotThunk = (spot) => async (dispatch) => {
    // console.log('createSpot spot: ', spot)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(spot)
    })
    if (response.ok) {
        const data = await response.json();
        return data;
    }
};

// Load users spots
export const getUserSpotsThunk = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')
    if (response.ok) {
        const userSpots = await response.json()
        dispatch(getAllUserSpots(userSpots))
        return userSpots
    }
}

// Update Spot
export const updateSpotThunk = spot => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot)
    });
    if (response.ok) {
        const updatedSpot = await response.json();
        dispatch(getASpot(updatedSpot))
        return updatedSpot;
    }
}

// Delete Spot
export const deleteSpotThunk = (spotId) => async dispatch => {
    // fetch must be made to URL path
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    // console.log('spotId BEFORE delete response: ', spotId)
    dispatch(deleteASpot(spotId))
    // console.log('spotId AFTER delete response: ', spotId)
    return response;
};

// key into 2nd
const initialState = { allSpots: {}, singleSpot: {}, userSpots: [] }

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_SPOTS:
            newState = { ...state, allSpots: {} };
            // key into 'spot' from action creator and 'Spots' from the return in backend route
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;

        case GET_SPOT:
            newState = { ...state, singleSpot: action.spot }
            return newState;

        case GET_USER_SPOTS:
            newState = { ...state, allSpots: {} };
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })
            return newState;

        case DELETE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spotId]
            return newState;


        default:
            return state; // Return the current state by default

    }
}

export default spotsReducer;
