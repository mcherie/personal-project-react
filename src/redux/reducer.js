import * as actions from './action';

// export const asyncFetch = (asyncEvent='') => {
//     return (state = {isFetching: false,error: false, data: {}}, action) => {
//         switch(action.type) {
//             case actions.ASYNC_FETCH+asyncEvent:
//                 return {...state, isFetching: true, error: false};
//             case actions.ASYNC_FETCH_SUCCESS+asyncEvent:
//                 return {...state, isFetching: false, error: false, data: action.data};
//             case actions.ASYNC_FETCH_FAILURE+asyncEvent:
//                 return {...state, isFetching: false, error: action.error};
//             case actions.ASYNC_FETCH_INVALIDATE+asyncEvent:
//                 return {...state, isFetching: false, error: false, data: {}};
//             default:
//                 return state;
//         }
//     }
// };


export const asyncFetch = () => {
    return (state = {
        isFetching: false,
        error: false,
        data: {}
    }, action) => {
        switch (action.type) {
            case actions.ACTION_TYPES.ASYNC_FETCH:
                return {
                    ...state, isFetching: true, error: false
                };
            case actions.ACTION_TYPES.ASYNC_FETCH_SUCCESS:
                return {
                    ...state, isFetching: false, error: false, data: action.data
                };
            case actions.ACTION_TYPES.ASYNC_FETCH_FAILURE:
                return {
                    ...state, isFetching: false, error: action.error
                };
            // case actions.ACTION_TYPES.ASYNC_FETCH_FAILURE:
            //                 return {
            //                     ...state,
            //                     isFetching: false,
            //                     error: action.error
            //                 };
            //  case actions.ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS:
            //                                 return {
            //                                     ...state,
            //                                     isFetching: false,
            //                                     error: action.error
            //                                 };
            case actions.ACTION_TYPES.ASYNC_FETCH_INVALIDATE:
                return {
                    ...state, isFetching: false, error: false, data: {}
                };
            default:
                return state;
        }
    }
};