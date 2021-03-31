import { Action } from "redux";
import { LoadingStatus } from "../../types";
import { AddTweetDataInterface, TweetInterface, TweetsState } from "./contracts/state";

export enum TweetsActionsType {
  SET_TWEETS = "tweets/SET_TWEETS",
  FETCH_TWEETS = "tweets/FETCH_TWEETS",
  SET_LOADING_STATE = "tweets/SET_LOADING_STATE",
  FETCH_ADD_TWEET = "tweets/FETCH_ADD_TWEET",
  ADD_NEW_TWEET = "tweets/ADD_NEW_TWEET",
  SET_STATUS_ADD_TWEET = "tweets/SET_STATUS_ADD_TWEET",
}



export interface SetTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_TWEETS;
  payload: TweetsState["items"];
}

export interface SetNewTweetActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.ADD_NEW_TWEET;
  payload: TweetInterface;
}

interface SetLoadingActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_LOADING_STATE;
  payload: LoadingStatus;
}

export interface SetStatusAddTweetActionInterface
  extends Action<TweetsActionsType> {
  type: TweetsActionsType.SET_STATUS_ADD_TWEET;
  payload: LoadingStatus;
}

export interface FetchTweetsActionInterface extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_TWEETS;
}

export interface FetchAddTweetActionInterface
  extends Action<TweetsActionsType> {
  type: TweetsActionsType.FETCH_ADD_TWEET;
  payload: AddTweetDataInterface;
}

export const setTweets = (
  payload: TweetsState["items"]
): SetTweetsActionInterface => ({
  type: TweetsActionsType.SET_TWEETS,
  payload,
});

export const setNewTweet = (
  payload: TweetInterface
): SetNewTweetActionInterface => ({
  type: TweetsActionsType.ADD_NEW_TWEET,
  payload,
});

export const fetchAddTweet = (
  payload: AddTweetDataInterface
): FetchAddTweetActionInterface => ({
  type: TweetsActionsType.FETCH_ADD_TWEET,
  payload,
});

export const setLoadingState = (
  payload: LoadingStatus
): SetLoadingActionInterface => ({
  type: TweetsActionsType.SET_LOADING_STATE,
  payload,
});

export const setStatusAddTweetState = (
  payload: LoadingStatus
): SetStatusAddTweetActionInterface => ({
  type: TweetsActionsType.SET_STATUS_ADD_TWEET,
  payload,
});

export const fetchTweets = (): FetchTweetsActionInterface => ({
  type: TweetsActionsType.FETCH_TWEETS,
});

export type TweetsActions =
  | SetTweetsActionInterface
  | SetLoadingActionInterface
  | FetchTweetsActionInterface
  | FetchAddTweetActionInterface
  | SetNewTweetActionInterface
  | SetStatusAddTweetActionInterface;
