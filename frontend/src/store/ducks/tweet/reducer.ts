import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { TweetDataActions, TweetDataActionsType } from "./actionCreators";
import { TweetDataState } from "./contracts/state";

const initialTweetsState: TweetDataState = {
  item: undefined,
  loadingStatus: LoadingStatus.NEVER,
};

export const tweetDataReducer = produce(
  (draft: Draft<TweetDataState>, action: TweetDataActions) => {
    switch (action.type) {
      case TweetDataActionsType.SET_TWEET_DATA:
        draft.item = action.payload;
        draft.loadingStatus = LoadingStatus.LOADED;
        break;
      case TweetDataActionsType.FETCH_TWEET_DATA:
        draft.item = undefined;
        draft.loadingStatus = LoadingStatus.LOADING;
        break;
      case TweetDataActionsType.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialTweetsState
);
