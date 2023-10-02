import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots/AllSpots'
import { SingleSpot } from "./components/SingleSpot/SingleSpot";

import MakeNewSpot from "./components/CreateSpot";
import UsersSpots from "./components/ManageSpots"
import UpdateSpot from "./components/UpdateSpots"

function App() {
  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  // dispatch dispatches thunk action .restoreUser()
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route path='/spots/new'>
            <MakeNewSpot />
          </Route>
          <Route path='/spots/current'>
            <UsersSpots />
          </Route>
          <Route path='/spots/:spotId/edit'>
            <UpdateSpot />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot isLoaded={isLoaded} />

          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
