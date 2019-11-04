// export const ASYNC_FETCH = 'ASYNC_FETCH_';
// export const ASYNC_FETCH_SUCCESS = 'ASYNC_FETCH_SUCCESS_';
// export const ASYNC_FETCH_FAILURE = 'ASYNC_FETCH_FAILURE_';
// export const ASYNC_FETCH_INVALIDATE = 'ASYNC_FETCH_INVALIDATE_';
// export const GET_REPOS = 'GET_REPOS';
// export const GET_PULL_REQUESTS = 'GET_PULL_REQUESTS';

export const ACTION_TYPES = {
    ASYNC_FETCH: 'ASYNC_FETCH_',
    ASYNC_FETCH_SUCCESS: 'ASYNC_FETCH_SUCCESS_',
    ASYNC_FETCH_FAILURE: 'ASYNC_FETCH_FAILURE_',
    ASYNC_FETCH_INVALIDATE: 'ASYNC_FETCH_INVALIDATE_',
    GET_REPOS: 'GET_REPOS',
    GET_PULL_REQUESTS: 'GET_PULL_REQUESTS',
    // ASYNC_FETCH_SUCCESS_GET_REPO: 'ASYNC_FETCH_SUCCESS_GET_REPO',
    // ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS: 'ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS',
}

// export const asyncFetch = (asyncEvent='') => {
    export const asyncFetch = () => ({
    // return {
        // type: `${ASYNC_FETCH}${asyncEvent}`,
        type: ACTION_TYPES.ASYNC_FETCH,
        // asyncEvent
        // payload: asyncEvent
    // }
});

// export const asyncFetchSuccess = (asyncEvent='', data) => {
//     return {
//         type: `${ASYNC_FETCH_SUCCESS}${asyncEvent}`,
//         asyncEvent,
//         data
//     }
// };

// export const asyncFetchFailure = (asyncEvent='', error) => {
//     return {
//         type: `${ASYNC_FETCH_FAILURE}${asyncEvent}`,
//         asyncEvent,
//         error
//     }
// };

// export const invalidateAsyncFetch = (asyncEvent='') => {
//     return {
//         type: `${ASYNC_FETCH_INVALIDATE}${asyncEvent}`,
//         asyncEvent
//     }
// };

export const asyncFetchSuccess = (data) => ({
        type: ACTION_TYPES.ASYNC_FETCH_SUCCESS,
        data
});

export const asyncFetchFailure = (error) => ({
        type: ACTION_TYPES.ASYNC_FETCH_FAILURE,
        error
});

export const invalidateAsyncFetch = () => ({
        type: ACTION_TYPES.ASYNC_FETCH_INVALIDATE,
});

// export const getRepos = () => ({
//     type: `ACTION_TYPES.GET_REPOS`,
// });

// export const getPullRequests = () => ({
//         type: ACTION_TYPES.GET_PULL_REQUESTS,
// })

// export const asyncFetchSuccess_getRepos = () => ({
//     type: ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_REPO,
// })

// export const asyncFetchSuccess_getPRs = () => ({
//     type: ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS,
// })



const fetchRepoDetails = async (repoName) => {
    const getForkedRepos = await fetch(`https://api.github.com/repos/${repoName}?client_id=b58daa635e758f52a54c&client_secret=30ee05e2325325ca9cd85a8256df6a397f5ef677
`);
    const forkedReposJson = await getForkedRepos.json();
    const forkParent = forkedReposJson.parent.full_name;
    return {repoName, forkParent};
};

export const fetchForkedRepos = (username) => async (dispatch) => {
    try {
        dispatch(asyncFetch());
        const repos_URL = `https://api.github.com/users/${username}/repos?client_id=b58daa635e758f52a54c&client_secret=30ee05e2325325ca9cd85a8256df6a397f5ef677
`;
        const reposResponse = await fetch(repos_URL);
        if (reposResponse.status < 200 && reposResponse.status > 300) {
            return dispatch(asyncFetchFailure(reposResponse.statusText));
        }
        const receivedRepos = await reposResponse.json();
        const forkedProjects = receivedRepos.filter(item => item.fork);

        const parentRepoNames = await Promise.all(forkedProjects.map(repo => {
            return fetchRepoDetails(repo.full_name);
        }));
        // This is where are we might have to put a ACTION_TYPES.GET_REPOS
        dispatch(asyncFetchSuccess(parentRepoNames));
    } catch (err) {
        dispatch(asyncFetchFailure( err.message));
    }
};

export const fetchPullRequests = (username) => async (dispatch) => {
    try {
        dispatch(asyncFetch(ACTION_TYPES.GET_PULL_REQUESTS));
        const events_URL = `https://api.github.com/users/${username}/events?client_id=b58daa635e758f52a54c&client_secret=30ee05e2325325ca9cd85a8256df6a397f5ef677
`;
        const eventsResponse = await fetch(events_URL);
        if (eventsResponse.status < 200 && eventsResponse.status > 300) {
            return dispatch(asyncFetchFailure(ACTION_TYPES.GET_REPOS, eventsResponse.statusText));
        }
        const receivedEvents = await eventsResponse.json();
        const allPullRequests = receivedEvents.filter(event => event.type === "PullRequestEvent");

        const uniquePullRequests = [];

        allPullRequests.forEach(item => {
            const url = item.payload.pull_request.url;
            if (uniquePullRequests.indexOf(url) === -1) {
                uniquePullRequests.push(url);
            }
        });

        const initialPullRequests = uniquePullRequests.map(async item => {
            const response = await fetch(item);
            return await response.json();
        });
        const pullRequests = await Promise.all(initialPullRequests);

            // Here we might have to add ACTION_TYPES.GET_PULL_REQUESTS, 
        dispatch(asyncFetchSuccess(pullRequests));
    } catch (err) {
        dispatch(asyncFetchFailure(err.message));
    }
};
