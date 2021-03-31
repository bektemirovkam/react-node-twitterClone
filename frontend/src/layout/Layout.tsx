import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SideMenu } from "../components/SideMenu";
import { Switch, Route, Redirect } from "react-router-dom";
import { Home } from "../pages/Home";
import { Search } from "../pages/_Search";
import { Notifications } from "../pages/_Notifications";
import { Messages } from "../pages/_Messages";
import { ConnectPeople } from "../pages/_ConnectPeople";
import { Profile } from "../pages/_Profile";
import { TweetPage } from "../pages/TweetPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      maxWidth: 1240,
      minHeight: "100%",
      margin: "0 auto",
    },
  })
);

interface HomeProps {}

export const Layout: React.FC<HomeProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <SideMenu />
        </Grid>
        <Grid item xs={9}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/search" component={Search} />
            <Route path="/tweets/:tweetId" component={TweetPage} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/messages" component={Messages} />
            <Route path="/i/connect_people" component={ConnectPeople} />
            <Route path="/profile/:id" component={Profile} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};
