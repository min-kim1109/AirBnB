import { csrfFetch } from "./csrf";


//constants
const LOAD_SPOTS = 'spots/getSpots';
// const LOAD_DETAILS = 'spots/getSpotDetails'

//actions
const loadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
};

// const getSpotDetails = (spot) => ({
//     type: LOAD_DETAILS,
//     spot
// })


// thunks
export const thunkLoadSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    console.log('response: ', response)
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data));
        return data;
    }
};

// export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`);
//     if (response.ok) {
//         const data = await response.json();
//         console.log(data)
//         dispatch(getSpotDetails(data))
//     }
// }

// reducers
const initialState = {
    allSpots: {}, oneSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = {};
            action.spots.Spots.forEach((spot) => {
                newState[spot.id] = spot;
            });
            return newState
        // case LOAD_DETAILS:
        //     const oneSpot = action.spot
        //     newState = { ...state, oneSpot }
        //     return newState;
        default:
            return state
    }
}

export default spotsReducer
