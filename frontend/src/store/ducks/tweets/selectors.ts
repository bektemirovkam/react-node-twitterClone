import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
import { RootState } from "./../../store";
import {  TweetsState } from "./contracts/state";

export const selectTweets = (state: RootState): TweetsState => state.tweets

export const selectLoadingTweetsState = (state: RootState): LoadingStatus =>
  selectTweets(state).loadingStatus;

  export const selectStatusAddTweetState = (state: RootState): LoadingStatus =>
  selectTweets(state).statusAddTweet;

export const selectIsTweetsLoading = (state: RootState): boolean =>
selectLoadingTweetsState(state) === LoadingStatus.LOADING;

export const selectIsTweetsLoaded = (state: RootState): boolean =>
selectLoadingTweetsState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = createSelector(
  selectTweets,
  (tweets) => tweets.items
);
