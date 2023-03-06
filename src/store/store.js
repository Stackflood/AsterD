import {configureStore, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import MoviesSlice from './slices/MoviesSlice';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const combinedReducer = combineReducers({
  MoviesRecords: MoviesSlice,
});

const rootReducer = (state, action) => {
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: composeWithDevTools(getDefaultMiddleware =>
    getDefaultMiddleware().concat(middleware),
  ),
});

sagaMiddleware.run(rootSaga);
