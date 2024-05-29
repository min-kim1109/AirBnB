import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";

import Navigation from "./components/Navigation";
import SpotsBrowser from './components/SpotsLandingPage'
import SingleSpot from "./components/SingleSpot";
import SpotReviews from "./components/SpotReviews";
import CreateNewSpot from "./components/NewSpot";
import UserSpots from "./components/ManageSpots";
import UpdateSpot from "./components/UpdateSpot/UpdateSpot";

function App() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoaded, setIsLoaded] = useState(false);
    // dispatch dispatches thunk action .restoreUser()
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const onClick = (e) => {
        history.push('/')
    }

    return (
        <>
            <Navigation isLoaded={isLoaded} />
            {isLoaded && (
                <Switch>
                    <Route exact path='/'>
                        <SpotsBrowser />
                    </Route>
                    <Route path='/spots/new'>
                        <CreateNewSpot />
                    </Route>
                    <Route path='/spots/current'>
                        <UserSpots />
                    </Route>
                    <Route path='/spots/:spotId/edit'>
                        <UpdateSpot />
                    </Route>
                    <Route path='/spots/:spotId'>
                        <SingleSpot isLoaded={isLoaded} />
                        <SpotReviews />
                    </Route>

                </Switch>
            )}
        </>
    );
}

export default App;
