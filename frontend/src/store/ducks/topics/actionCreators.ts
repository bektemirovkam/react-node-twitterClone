import { Action } from 'redux';
import { LoadingStatus } from '../../types';
import { TopicState } from './contracts/state';


export enum TopicsActionsType{ 
    FETCH_TOPICS = "topics/FETCH_TOPICS",
    SET_TOPICS = "topics/SET_TOPICS",
    SET_LOADING_STATE = "topics/SET_LOADING_STATE"
}


interface FetchTopicsInterface extends Action<TopicsActionsType> {
    type: TopicsActionsType.FETCH_TOPICS
}

export const fetchTopics = (): FetchTopicsInterface => ({
    type: TopicsActionsType.FETCH_TOPICS
});

interface SetTopicsIterface extends Action<TopicsActionsType>{
    type: TopicsActionsType.SET_TOPICS,
    payload: TopicState['topics']
}

export const setTopics = (payload: TopicState['topics']): SetTopicsIterface => ({
    type: TopicsActionsType.SET_TOPICS,
    payload
})


interface SetLoadingState extends Action<TopicsActionsType>{
    type: TopicsActionsType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export const setTopicsLoadingState = (payload: LoadingStatus): SetLoadingState => ({
    type: TopicsActionsType.SET_LOADING_STATE,
    payload
})

export type TopicsActions = FetchTopicsInterface | SetTopicsIterface | SetLoadingState