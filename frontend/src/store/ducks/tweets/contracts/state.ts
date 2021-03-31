import { LoadingStatus } from "../../../types";

// export enum StateStatusAddTweet {
//   LOADING = "LOADING",
//   NEVER = "NEVER",
//   ERROR = "ERROR",
// }
export interface AddTweetDataInterface {
  text: string;
  images: string[];
}

export interface TweetInterface {
  _id?: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  user: {
    fullname: string;
    username: string;
    avatarSrc?: string;
  };
  images?: string[];
}

export interface TweetsState {
  items: TweetInterface[];
  loadingStatus: LoadingStatus;
  statusAddTweet: LoadingStatus;
}
