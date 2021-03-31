import { all } from "redux-saga/effects";
import { topicsSaga } from "./ducks/topics/saga";
import { tweetsSaga } from "./ducks/tweets/saga";
import { tweetSaga } from "./ducks/tweet/saga";
import { userSaga } from "./ducks/user/saga";

export default function* rootSaga() {
  yield all([tweetsSaga(), topicsSaga(), tweetSaga(), userSaga()]);
}
