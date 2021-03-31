import { call, put, takeEvery } from "redux-saga/effects";
import {
  FetchAddTweetActionInterface,
  setLoadingState,
  setNewTweet,
  setStatusAddTweetState,
  setTweets,
  TweetsActionsType,
} from "./actionCreators";
import { TweetsApi } from "./../../../services/api/tweetsApi";
import {
  TweetInterface,
  TweetsState,
} from "./contracts/state";
import { LoadingStatus } from "../../types";

export function* fetchTweetsRequest() {
  try {
    const tweets: TweetsState["items"] = yield call(TweetsApi.fetchTweets);
    yield put(setTweets(tweets));
  } catch (error) {
    yield put(setLoadingState(LoadingStatus.ERROR));
  }
}

export function* fetchAddTweetRequest({
  payload,
}: FetchAddTweetActionInterface) {
  try {
    const newTweet: TweetInterface = yield call(TweetsApi.addTweet, payload);
    yield put(setNewTweet(newTweet));
  } catch (error) {
    yield put(setStatusAddTweetState(LoadingStatus.ERROR));
  }
}

export function* tweetsSaga() {
  yield takeEvery(TweetsActionsType.FETCH_TWEETS, fetchTweetsRequest);
  yield takeEvery(TweetsActionsType.FETCH_ADD_TWEET, fetchAddTweetRequest);
}
