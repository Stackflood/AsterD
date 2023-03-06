import {call, put, select, takeEvery} from 'redux-saga/effects';
import {sagaActions} from '../../../store/sagas/sagaActions';

import MoviesApi from '../../../store/api/MoviesApi';
import { setLoading, setMovies } from '../../../store/slices/MoviesSlice';

export function* getMovies(params) {
  yield put(setLoading(true));
  let response = yield call(() => MoviesApi.request(params.url,params.queryPayload));
    yield put(setMovies([response.results]));
    yield put(setLoading(false));
}


export const MoviesSagas = [
  takeEvery(sagaActions.GET_MOVIES, getMovies)
];
