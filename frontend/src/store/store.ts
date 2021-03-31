import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { TopicState } from "./ducks/topics/contracts/state";
import { TweetDataState } from "./ducks/tweet/contracts/state";
import { TweetsState } from "./ducks/tweets/contracts/state";
import { rootReducer } from "./rootReducer";
import rootSaga from "./sagas";
import { AuthorsState } from './ducks/authors/contracts/state';
import { UserState } from "./ducks/user/contracts/state";


const composeEnhancers =
  (typeof window !== "undefined" &&
  //@ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware()

export interface RootState {
  tweets: TweetsState,
  tweet: TweetDataState,
  topics: TopicState,
  user: UserState,
  authors: AuthorsState
}

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga)