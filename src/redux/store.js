import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reduxThunk from "redux-thunk";
import * as reducers from "./reducer";
import * as actions from './action';

// const enhancers = [applyMiddleware(...[reduxThunk])];

// const composeEnhancehers = process.env.NODE_ENV !== 'production' &&
// typeof window === 'object' &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;


const rootReducer = combineReducers({
    repos: reducers.asyncFetch(actions.ACTION_TYPES.GET_REPOS),
    pullRequests: reducers.asyncFetch(actions.ACTION_TYPES.GET_PULL_REQUESTS)
});

const configureStore = (initialState = {}) => createStore(
    rootReducer,
    initialState,
    // composeEnhancehers(...enhancers)
    applyMiddleware(reduxThunk)
);

export default configureStore;
