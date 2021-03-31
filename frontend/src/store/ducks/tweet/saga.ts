import { call, put, takeEvery } from 'redux-saga/effects'
import { FetchTweetDataActionInterface, setLoadingState, setTweetData, TweetDataActionsType } from './actionCreators'
import { TweetsApi } from './../../../services/api/tweetsApi';
import { TweetInterface } from '../tweets/contracts/state';
import { LoadingStatus } from '../../types';


export function* fetchTweetDataRequest({ payload: tweetId }: FetchTweetDataActionInterface) {
    try {
    const tweet: TweetInterface = yield call(TweetsApi.fetchTweet, tweetId);
    yield put(setTweetData(tweet))   
    } catch (error) {
        yield put(setLoadingState(LoadingStatus.ERROR))
    }
}

export function* tweetSaga() {
    yield takeEvery(TweetDataActionsType.FETCH_TWEET_DATA , fetchTweetDataRequest)
}