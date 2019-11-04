import * as actions from './action';

export const asyncFetchRepos = (state = {
    isFetching: false,
    error: false,
    data: {}
}, action) => {
    debugger;
    switch (action.type) {
        case actions.ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_REPOS:
            return {
                ...state, isFetching: false, error: false, data: action.data
            };
        case actions.ACTION_TYPES.ASYNC_FETCH_GET_REPOS:
            return {
                ...state, isFetching: true, error: false
            };
        default:
            return state;
    }
};

export const asyncFetchPullRequests = (state = {
    isFetching: false,
    error: false,
    data: {}
}, action) => {
    debugger;
    switch (action.type) {
        case actions.ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS:
            return {
                ...state, isFetching: false, error: false, data: action.data
            };
        case actions.ACTION_TYPES.ASYNC_FETCH_GET_PULL_REQUESTS:
            return {
                ...state, isFetching: true, error: false
            };
        default:
            return state;
    }
};
