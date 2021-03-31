import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { HeaderFeed } from "../../components/HeaderFeed";
import { useHistory, useParams } from "react-router-dom";
import { SearchField } from "../../components/SearchField";
import { ActualAuthor } from "../../components/ActualAuthor";
import { ActualTheme } from "../../components/ActualTheme";
import { useDispatch, useSelector } from "react-redux";
import { fetchTweetData, setTweetData } from "../../store/ducks/tweet/actionCreators";
import {
  selectIsTweetDataLoading,
  selectTweetItem,
} from "../../store/ducks/tweet/selectors";
import { FullTweet } from "../../components/FullTweet";

export const useStylesTweetPage = makeStyles((theme: Theme) =>
  createStyles({
    feedWrapper: {
      borderTop: "none",
      borderBottom: "none",
      borderRadius: 0,
    },
    rightBarWrapper: {
      border: "none",
    },
    fetchTweetProgress: {
      textAlign: "center",
      marginTop: 20,
    },
  })
);

interface TweetParamsInterface {
  profileName: string;
  tweetId: string;
}

export const TweetPage = () => {
  const classes = useStylesTweetPage();

  const history = useHistory();
  const params = useParams<TweetParamsInterface>();
  const { tweetId } = params;

  const dispatch = useDispatch();

  const tweetData = useSelector(selectTweetItem);
  const tweetLoading = useSelector(selectIsTweetDataLoading);

  useEffect(() => {
    dispatch(fetchTweetData(tweetId));
    return () => {
      dispatch(setTweetData(undefined));
    };
  }, [tweetId, dispatch]);

  const handlerClickOnBackBtn = () => {
    history.goBack();
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={8}>
        <Paper variant="outlined" className={classes.feedWrapper} square>
          <HeaderFeed
            title="Твитнуть"
            goBack
            goBackHandler={handlerClickOnBackBtn}
          />
          {tweetLoading ? (
            <div className={classes.fetchTweetProgress}>
              <CircularProgress />
            </div>
          ) : (
            tweetData && <FullTweet tweet={tweetData} />
          )}
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper square variant="outlined" className={classes.rightBarWrapper}>
          <SearchField />
          <ActualAuthor title="Подходящие люди" />
          <ActualTheme />
        </Paper>
      </Grid>
    </Grid>
  );
};
