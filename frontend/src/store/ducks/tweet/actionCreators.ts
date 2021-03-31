import { Action } from "redux";
import { LoadingStatus } from "../../types";
import { TweetDataState } from "./contracts/state";

export enum TweetDataActionsType {
  SET_TWEET_DATA = "tweetData/SET_TWEET",
  FETCH_TWEET_DATA = "tweetData/FETCH_TWEET",
  SET_LOADING_STATE = "tweetData/SET_LOADING_STATE",
}

export interface SetTweetDataActionInterface extends Action<TweetDataActionsType> {
  type: TweetDataActionsType.SET_TWEET_DATA;
  payload: TweetDataState["item"] | undefined;
}

interface SetLoadingActionInterface extends Action<TweetDataActionsType> {
  type: TweetDataActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface FetchTweetDataActionInterface extends Action<TweetDataActionsType> {
  type: TweetDataActionsType.FETCH_TWEET_DATA;
  payload: string;
}

export const setTweetData = (
  payload: TweetDataState["item"] | undefined
): SetTweetDataActionInterface => ({
  type: TweetDataActionsType.SET_TWEET_DATA,
  payload,
});

export const setLoadingState = (
  payload: LoadingStatus
): SetLoadingActionInterface => ({
  type: TweetDataActionsType.SET_LOADING_STATE,
  payload,
});

export const fetchTweetData = (payload: string): FetchTweetDataActionInterface => ({
  type: TweetDataActionsType.FETCH_TWEET_DATA,
  payload
});

export type TweetDataActions =
  | SetTweetDataActionInterface
  | SetLoadingActionInterface
  | FetchTweetDataActionInterface;
