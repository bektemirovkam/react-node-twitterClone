import React, { useEffect } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

import { SignIn } from "./pages/SignIn";
import { Layout } from "./layout/Layout";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectIsAuth,
  selectLoadingUserState,
} from "./store/ducks/user/selectors";
import { LoadingStatus } from "./store/types";
import { checkUserData } from "./store/ducks/user/actionCreators";
import { useStylesHome } from "./pages/Home";

const App: React.FC = () => {
  const classes = useStylesHome();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(selectIsAuth);
  const userLoadingStatus = useSelector(selectLoadingUserState);
  const isReady =
    userLoadingStatus !== LoadingStatus.LOADING &&
    userLoadingStatus !== LoadingStatus.NEVER;

  useEffect(() => {
    dispatch(checkUserData());
  }, []);

  useEffect(() => {
    if (isAuth && isReady) {
      history.push("/home");
    } else {
      history.push("/signin");
    }
  }, [isAuth, isReady]);

  return (
    <div className="App">
      {isReady ? (
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route path="*" component={Layout} />
        </Switch>
      ) : (
        <div className={classes.centered}>
          <TwitterIcon color="primary" style={{fontSize: 68}} />
        </div>
      )}
    </div>
  );
};

export default App;
