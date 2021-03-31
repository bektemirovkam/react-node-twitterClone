import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
import { RootState } from "./../../store";
import { TopicState } from "./contracts/state";

const selectTopic = (state: RootState): TopicState => state.topics;

export const selectLoadingTopicsState = (state: RootState) =>
  selectTopic(state).loadingStatus;

export const selectIsTopicsLoaded = (state: RootState) =>
  selectLoadingTopicsState(state) === LoadingStatus.LOADED;
  
export const selectIsTopicsLoading = (state: RootState) =>
  selectLoadingTopicsState(state) === LoadingStatus.LOADING;

  export const selectTopicsItems = createSelector(
    selectTopic,
    (topics) => topics.topics
  );
  