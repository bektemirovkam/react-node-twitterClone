import { combineReducers} from 'redux';
import { topicReducer } from './ducks/topics/reducer';
import { tweetsReducer } from './ducks/tweets/reducer';
import {tweetDataReducer} from "./ducks/tweet/reducer";
import { authorsReducer } from './ducks/authors/reducer';
import { userReducer } from './ducks/user/reducer';

export const rootReducer = combineReducers({
    tweets: tweetsReducer,
    tweet: tweetDataReducer,
    topics: topicReducer,
    user: userReducer,
    authors: authorsReducer
})