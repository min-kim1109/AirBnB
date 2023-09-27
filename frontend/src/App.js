import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import * as sessionActions from "./store/session";
// import * as spotsActions from './store/spots'
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots/AllSpots'
import SingleSpot from "./components/SingleSpot";

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
            <AllSpots />
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
