import { call, put, takeEvery } from "redux-saga/effects";
import { AuthApi } from "../../../services/api/authApi";
import { UserState } from "./contracts/state";
import {
  FetchRegisterActionInterface,
  FetchSignInActionInterface,
  setUserData,
  setUserLoadingState,
  UserActionsTypes,
} from "./actionCreators";
import { LoadingStatus } from "../../types";

export function* fetchSignInRequest({ payload }: FetchSignInActionInterface) {
  try {
    const data: UserState["data"] = yield call(AuthApi.login, payload);
    yield put(setUserData(data));
    window.localStorage.setItem("token", data?.token as string);
  } catch (error) {
    yield put(setUserLoadingState(LoadingStatus.ERROR));
  }
}

export function* fetchRegisterRequest({ payload }: FetchRegisterActionInterface) {
  try {
    yield put(setUserLoadingState(LoadingStatus.LOADING));
    yield call(AuthApi.register, payload);
    yield put(setUserLoadingState(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingState(LoadingStatus.ERROR));
  }
}

export function* fetchCheckUserDataRequest() {
  try {
    yield put(setUserLoadingState(LoadingStatus.LOADING));
    const data: UserState['data'] = yield call(AuthApi.getMe);
    yield put(setUserData(data))
    yield put(setUserLoadingState(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setUserLoadingState(LoadingStatus.ERROR));
  }
}



export function* userSaga() {
  yield takeEvery(UserActionsTypes.FETCH_USER_DATA, fetchSignInRequest);
  yield takeEvery(UserActionsTypes.FETCH_USER_REGISTER, fetchRegisterRequest);
  yield takeEvery(UserActionsTypes.CHECK_USER_DATA, fetchCheckUserDataRequest);
}
