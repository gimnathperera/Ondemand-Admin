import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/root.reducer';
import rootSaga from './sagas/root.saga';

const sagaMiddleWare = createSagaMiddleware();
const store = createStore(
  rootReducer,

  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);
sagaMiddleWare.run(rootSaga);
const persistor = persistStore(store);

export { store, persistor };
