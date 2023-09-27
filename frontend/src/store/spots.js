import { csrfFetch } from "./csrf";

// Type Constants
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';


// Action Creators
const getAllSpots = spot => {
    return { type: GET_ALL_SPOTS, spot }
};


// Thunk action to get all spots
export const getSpotsThunk = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`)
    // console.log('response: ', response)
    if (response.ok) {
        const spot = await response.json()
        dispatch(getAllSpots(spot))
        // console.log('spots', spot)
        return spot
    }
};


// key into 2nd
const initialState = { allSpots: {}, singleSpot: {} }

// Reducer
const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case GET_ALL_SPOTS:
            newState = { ...state, allSpots: {} };
            action.spot.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;

        default:
            return state
    }
}

export default spotsReducer
