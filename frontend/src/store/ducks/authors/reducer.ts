import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { AuthorsActions, AuthorsActionsType } from "./actionCreators";
import { AuthorsState } from "./contracts/state";

const initialTopicsState: AuthorsState = {
  authors: [],
  loadingStatus: LoadingStatus.NEVER,
};

export const authorsReducer = produce(
  (draft: Draft<AuthorsState>, action: AuthorsActions) => {
    switch (action.type) {
      case AuthorsActionsType.SET_AUTHORS:
        draft.authors = action.payload;
        draft.loadingStatus = LoadingStatus.LOADED;
        break;

      case AuthorsActionsType.FETCH_AUTHORS:
        draft.authors = [];
        draft.loadingStatus = LoadingStatus.LOADING;
        break;

      case AuthorsActionsType.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialTopicsState
);
