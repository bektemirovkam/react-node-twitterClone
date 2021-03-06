import { LoadingStatus } from "../../types";
import { RootState } from "../../store";
import { UserState } from "./contracts/state";

export const selectUserState = (state: RootState): UserState => state.user;

export const selectUserData = (state: RootState): UserState["data"] =>
  selectUserState(state).data;

export const selectIsAuth = (state: RootState): boolean => !!selectUserData(state)

export const selectLoadingUserState = (state: RootState): LoadingStatus =>
  selectUserState(state).loadingStatus;
