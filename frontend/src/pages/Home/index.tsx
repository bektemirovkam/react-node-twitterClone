import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FlareIcon from "@material-ui/icons/Flare";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { HeaderFeed } from "../../components/HeaderFeed";
import { Tweet } from "../../components/Tweet";
import { SearchField } from "../../components/SearchField";
import { AddTweetForm } from "../../components/AddTweetForm";
import { ActualTheme } from "../../components/ActualTheme";
import { ActualAuthor } from "../../components/ActualAuthor";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweets } from "./../../store/ducks/tweets/actionCreators";
import {
  selectIsTweetsLoading,
  selectTweetsItems,
} from "./../../store/ducks/tweets/selectors";

export const useStylesHome = makeStyles((theme: Theme) =>
  createStyles({
    feedWrapper: {
      borderTop: "none",
      borderBottom: "none",
      borderRadius: 0,
    },
    tweetsSeparator: {
      height: 10,
      backgroundColor: "rgb(235, 238, 240)",
    },
    rightBarWrapper: {
      border: "none",
    },
    fetchTweetsProgress: {
      textAlign: "center",
      marginTop: 20,
    },
    centered: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);

export const Home: React.FC = () => {
  const classes = useStylesHome();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

//  const sendHandler = () => {
//    //@ts-ignore
//    let photo = document.getElementById("avatar").files[0]; // file from input
//    let req = new XMLHttpRequest();
//    let formData = new FormData();

//    formData.append("avatar", photo);
//    req.open("POST", "/upload");
//    req.send(formData);
//  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Paper variant="outlined" className={classes.feedWrapper} square>
          <HeaderFeed
            title="Последние твиты"
            Icon={FlareIcon}
            onClickIcon={() => {}}
          >
            <AddTweetForm />
          </HeaderFeed>
          <div className={classes.tweetsSeparator}></div>
          {/* <form encType="multipart/form-data">
          <input type="file" id="avatar" name="avatar" onChange={()=>{sendHandler()}} />
          </form> */}
          {isLoading ? (
            <div className={classes.fetchTweetsProgress}>
              <CircularProgress />
            </div>
          ) : (
            tweets?.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
          )}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper square variant="outlined" className={classes.rightBarWrapper}>
          <SearchField />
          <ActualTheme />
          <ActualAuthor title="Кого читать" />
        </Paper>
      </Grid>
    </Grid>
  );
};
