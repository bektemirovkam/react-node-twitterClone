import { LoadingStatus } from "../../../types";

interface TopicInterface{
    _id: string;
    count: string;
    about: string;
    name : string;
}


export interface TopicState {
    topics: TopicInterface[],
    loadingStatus: LoadingStatus
}