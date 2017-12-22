import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const routerMiddleware = createRouterMiddleware(history);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devTools ? devTools({}) : compose;

const RootStore =
  process.env.NODE_ENV === 'production'
    ? createStore(
        rootReducer,
        compose(applyMiddleware(apiMiddleware, thunk, routerMiddleware))
      )
    : createStore(
        rootReducer,
        composeEnhancers(
          applyMiddleware(
            apiMiddleware,
            thunk,
            routerMiddleware,
            createLogger()
          )
        )
      );

export default RootStore;
