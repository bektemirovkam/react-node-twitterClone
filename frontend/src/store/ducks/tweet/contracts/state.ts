import { LoadingStatus } from "../../../types";
import { TweetInterface } from "../../tweets/contracts/state";


export interface TweetDataState{
    item?: TweetInterface,
    loadingStatus: LoadingStatus;
}