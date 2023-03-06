import {all} from 'redux-saga/effects';
import { MoviesSagas } from '../../containers/screens/movies/MoviesSagas';

export default function* rootSaga() {
  yield all([
    ...MoviesSagas
  ]);
}