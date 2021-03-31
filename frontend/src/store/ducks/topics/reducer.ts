import produce, { Draft } from "immer";
import { LoadingStatus } from "../../types";
import { TopicsActions, TopicsActionsType } from "./actionCreators";
import { TopicState } from "./contracts/state";

const initialTopicsState: TopicState = {
  topics: [],
  loadingStatus: LoadingStatus.NEVER,
};

export const topicReducer = produce(
  (draft: Draft<TopicState>, action: TopicsActions) => {
    switch (action.type) {
      case TopicsActionsType.SET_TOPICS:
        draft.topics = action.payload;
        draft.loadingStatus = LoadingStatus.LOADED;
        break;

      case TopicsActionsType.FETCH_TOPICS:
        draft.topics = [];
        draft.loadingStatus = LoadingStatus.LOADING;
        break;

      case TopicsActionsType.SET_LOADING_STATE:
        draft.loadingStatus = action.payload;
        break;
      default:
        break;
    }
  },
  initialTopicsState
);
