import { createSelector } from "reselect";
import { LoadingStatus } from "../../types";
import { RootState } from "./../../store";
import { AuthorsState } from "./contracts/state";

const selectAuthorsState = (state: RootState): AuthorsState => state.authors;

export const selectAuthorsLoadingState = (state: RootState) =>
  selectAuthorsState(state).loadingStatus;

export const selectIsAuthorsLoaded = (state: RootState) =>
  selectAuthorsLoadingState(state) === LoadingStatus.LOADED;

export const selectIsTopicsLoading = (state: RootState) =>
  selectAuthorsLoadingState(state) === LoadingStatus.LOADING;

export const selectAuthorsItems = createSelector(
  selectAuthorsState,
  (authors) => authors.authors
);
