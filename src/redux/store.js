import { createStore, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import * as reducers from "./reducer";

const rootReducer = combineReducers({
    repos: reducers.asyncFetchRepos,
    pullRequests: reducers.asyncFetchPullRequests
});

const configureStore = (initialState = {}) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxThunk)
);

export default configureStore;
