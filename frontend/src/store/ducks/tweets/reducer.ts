import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { TweetsActions, TweetsActionsType } from "./actionCreators";
import {
  TweetsState,
} from "./contracts/state";

const initialTweetsState: TweetsState = {
  items: [],
  loadingStatus: LoadingStatus.NEVER,
  statusAddTweet: LoadingStatus.NEVER,
};

export const tweetsReducer = produce(
  (draft: Draft<TweetsState>, action: TweetsActions) => {
    switch (action.type) {
      case TweetsActionsType.SET_TWEETS:
        draft.items = action.payload;
        draft.loadingStatus = LoadingStatus.LOADED;
        break;
      case TweetsActionsType.FETCH_TWEETS:
        draft.items = [];
        draft.loadingStatus = LoadingStatus.LOADING;
        break;
      case TweetsActionsType.FETCH_ADD_TWEET:
        draft.statusAddTweet = LoadingStatus.LOADING;
        break;
      case TweetsActionsType.SET_STATUS_ADD_TWEET:
        draft.statusAddTweet = action.payload;
        break;
      case TweetsActionsType.ADD_NEW_TWEET:
        draft.items.unshift(action.payload);
        draft.statusAddTweet = LoadingStatus.NEVER;
        break;
      case TweetsActionsType.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialTweetsState
);
