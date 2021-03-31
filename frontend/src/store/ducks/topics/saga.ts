import { call, put, takeEvery } from "redux-saga/effects";
import { setTopics, setTopicsLoadingState, TopicsActionsType } from "./actionCreators";
import { topicsApi } from "./../../../services/api/topicsApi";
import { LoadingStatus } from "../../types";
import { TopicState } from './contracts/state';

function* fetchTopics() {
  try {
    const topics: TopicState["topics"] = yield call(topicsApi.fetchTopics);
    yield put(setTopics(topics));
  } catch (error) {
    put(setTopicsLoadingState(LoadingStatus.ERROR));
  }
}


export function* topicsSaga() {
    yield takeEvery(TopicsActionsType.FETCH_TOPICS, fetchTopics)
}