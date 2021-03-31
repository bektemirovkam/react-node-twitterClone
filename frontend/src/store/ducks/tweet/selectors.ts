import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
import { RootState } from "./../../store";
import {  TweetDataState } from "./contracts/state";

export const selectTweet = (state: RootState): TweetDataState => state.tweet

export const selectLoadingTweetsState = (state: RootState): LoadingStatus =>
selectTweet(state).loadingStatus;

export const selectIsTweetDataLoading = (state: RootState): boolean =>
selectLoadingTweetsState(state) === LoadingStatus.LOADING;

export const selectIsTweetDataLoaded = (state: RootState): boolean =>
selectLoadingTweetsState(state) === LoadingStatus.LOADED;

export const selectTweetItem = createSelector(
  selectTweet,
  (tweetItem) => tweetItem.item
);
