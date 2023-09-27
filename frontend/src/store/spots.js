import { csrfFetch } from "./csrf";

// TYPE_CONSTANTS
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS';


// POJO action creator
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
    } else {
        const errors = await response.json();
        return errors
    }
};




// key into 2nd
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } }

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

        default:
            return state; // Return the current state by default

    }
}

export default spotsReducer;
