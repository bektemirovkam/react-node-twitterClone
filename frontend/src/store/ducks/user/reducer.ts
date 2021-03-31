import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { UserActions, UserActionsTypes } from "./actionCreators";
import { UserState } from "./contracts/state";

const initialTweetsState: UserState = {
  data: undefined,
  loadingStatus: LoadingStatus.NEVER,
};

export const userReducer = produce(
  (draft: Draft<UserState>, action: UserActions) => {
    switch (action.type) {
      case UserActionsTypes.SET_USER_DATA:
        draft.data = action.payload;
        draft.loadingStatus = LoadingStatus.SUCCESS;
        break;
      case UserActionsTypes.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      case UserActionsTypes.FETCH_USER_DATA:
        draft.loadingStatus = LoadingStatus.LOADING;
        break;
      default:
        break;
    }
  },
  initialTweetsState
);
