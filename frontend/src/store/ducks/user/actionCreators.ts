import { Action } from "redux";
import { LoadingStatus } from "../../types";
import { IUser } from './contracts/state';
import { LoginDataInterface, RegisterDataInterface } from '../../../services/api/authApi';

export enum UserActionsTypes {
  FETCH_USER_DATA = "user/FETCH_USER_DATA",
  FETCH_USER_REGISTER = "user/FETCH_USER_REGISTER",
  CHECK_USER_DATA = "user/CHECK_USER_DATA",
  SET_USER_DATA = "user/SET_USER_DATA",
  SET_LOADING_STATE = "user/SET_LOADING_STATE",
}

export interface SetUserDataActionInterface extends Action<UserActionsTypes> {
  type: UserActionsTypes.SET_USER_DATA;
  payload: IUser | undefined;
}

export interface SetLoadingActionInterface extends Action<UserActionsTypes> {
  type: UserActionsTypes.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface FetchSignInActionInterface extends Action<UserActionsTypes> {
  type: UserActionsTypes.FETCH_USER_DATA
  payload: LoginDataInterface
}

export interface FetchRegisterActionInterface extends Action<UserActionsTypes> {
  type: UserActionsTypes.FETCH_USER_REGISTER
  payload: RegisterDataInterface;
}

export interface CheckUserDataActionInterface extends Action<UserActionsTypes> {
  type: UserActionsTypes.CHECK_USER_DATA
}

export const fetchSignIn = (payload: LoginDataInterface):FetchSignInActionInterface => ({
  type: UserActionsTypes.FETCH_USER_DATA,
  payload
})

export const fetchRegister = (payload: RegisterDataInterface):FetchRegisterActionInterface => ({
  type: UserActionsTypes.FETCH_USER_REGISTER,
  payload
})

export const setUserData = (payload: IUser | undefined):SetUserDataActionInterface => ({
  type: UserActionsTypes.SET_USER_DATA,
  payload 
}) 

export const setUserLoadingState = (payload: LoadingStatus): SetLoadingActionInterface => ({
  type: UserActionsTypes.SET_LOADING_STATE,
  payload
})

export const checkUserData = (): CheckUserDataActionInterface => ({
  type: UserActionsTypes.CHECK_USER_DATA,
})


export type UserActions =
  | SetUserDataActionInterface
  | SetLoadingActionInterface
  | FetchSignInActionInterface
  | FetchRegisterActionInterface
  | CheckUserDataActionInterface
