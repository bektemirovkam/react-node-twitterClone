import { axios } from "../../core/axios";
import { TweetDataState } from "../../store/ducks/tweet/contracts/state";
import { AddTweetDataInterface, TweetsState } from "../../store/ducks/tweets/contracts/state";
import { TweetInterface } from "./../../store/ducks/tweets/contracts/state";

interface Response<T> {
  status: string;
  data: T;
}

export const TweetsApi = {
  fetchTweets: async (): Promise<TweetsState["items"]> => {
    const { data } = await axios
      .get<Response<TweetsState["items"]>>("/tweets");
    return data.data;
  },
  fetchTweet: async (tweetId: string): Promise<TweetDataState["item"]> => {
    const { data } = await axios
      .get<Response<TweetDataState["item"]>>("/tweets/" + tweetId);
    return data.data;
  },
  addTweet: async (formData: AddTweetDataInterface): Promise<TweetInterface> => {
    const { data } = await axios.post<Response<TweetInterface>>("/tweets", formData);
    return data.data;
  },
};
