import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, compose } from "redux";
import reducer from "/src/modules";
import rootSaga from "/src/modules/sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  /*
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  */
  const enhancer = applyMiddleware(...middlewares);
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  //debug: process.env.NODE_ENV === "development",
});

export default wrapper;
