import { Action } from 'redux';
import { LoadingStatus } from '../../types';
import { AuthorsState } from './contracts/state';


export enum AuthorsActionsType{ 
    FETCH_AUTHORS = "authors/FETCH_AUTHORS",
    SET_AUTHORS = "authors/SET_AUTHORS",
    SET_LOADING_STATE = "authors/SET_LOADING_STATE"
}


interface FetchAuthorsInterface extends Action<AuthorsActionsType> {
    type: AuthorsActionsType.FETCH_AUTHORS
}

export const fetchAuthors = (): FetchAuthorsInterface => ({
    type: AuthorsActionsType.FETCH_AUTHORS
});

interface SetAuthorsIterface extends Action<AuthorsActionsType>{
    type: AuthorsActionsType.SET_AUTHORS,
    payload: AuthorsState['authors']
}

export const setAuthors = (payload: AuthorsState['authors']): SetAuthorsIterface => ({
    type: AuthorsActionsType.SET_AUTHORS,
    payload
})


interface SetLoadingState extends Action<AuthorsActionsType>{
    type: AuthorsActionsType.SET_LOADING_STATE,
    payload: LoadingStatus
}

export const setAuthorsLoadingState = (payload: LoadingStatus): SetLoadingState => ({
    type: AuthorsActionsType.SET_LOADING_STATE,
    payload
})

export type AuthorsActions = FetchAuthorsInterface | SetAuthorsIterface | SetLoadingState