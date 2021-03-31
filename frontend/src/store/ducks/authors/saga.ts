import { call, put, takeEvery } from "redux-saga/effects";
import { LoadingStatus } from "../../types";
import { AuthorsState } from './contracts/state';
import { AuthorsApi } from "../../../services/api/authorsApi";
import { AuthorsActionsType, setAuthors, setAuthorsLoadingState } from "./actionCreators";

function* fetchAuthorsRequest() {
  try {
    const authors: AuthorsState['authors'] = yield call(AuthorsApi.fetchAuthors); // url
    yield put(setAuthors(authors));
  } catch (error) {
    put(setAuthorsLoadingState(LoadingStatus.ERROR));
  }
}


export function* topicsSaga() {
    yield takeEvery(AuthorsActionsType.FETCH_AUTHORS, fetchAuthorsRequest)
}