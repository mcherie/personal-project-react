export const ACTION_TYPES = {
    ASYNC_FETCH_GET_REPOS: 'ASYNC_FETCH_GET_REPOS',
    ASYNC_FETCH_GET_PULL_REQUESTS: 'ASYNC_FETCH_GET_PULL_REQUESTS',
    ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS: "ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS",
    ASYNC_FETCH_SUCCESS_GET_REPOS: "ASYNC_FETCH_SUCCESS_GET_REPOS",
}

export const asyncFetchGetRepos = () => ({
        type: ACTION_TYPES.ASYNC_FETCH_GET_REPOS,
})

export const asyncFetchGetPullRequests = () => ({
    type: ACTION_TYPES.ASYNC_FETCH_GET_PULL_REQUESTS,
})

export const asyncFetchSuccessGetRepos = (data) => ({
    type: ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_REPOS,
    data
});
export const asyncFetchSuccessGetPullRequests = (data) => ({
    type: ACTION_TYPES.ASYNC_FETCH_SUCCESS_GET_PULL_REQUESTS,
    data
});

const fetchRepoDetails = async (repoName) => {
    const getForkedRepos = await fetch(`https://api.github.com/repos/${repoName}`);
    const forkedReposJson = await getForkedRepos.json();
    const forkParent = forkedReposJson.parent.full_name;
    return {repoName, forkParent};
};

export const fetchForkedRepos = (username) => async (dispatch) => {
    try {
        dispatch(asyncFetchGetRepos());
        const repos_URL = `https://api.github.com/users/${username}/repos`;
        const reposResponse = await fetch(repos_URL);
        const receivedRepos = await reposResponse.json();
        const forkedProjects = receivedRepos.filter(item => item.fork);

        const parentRepoNames = await Promise.all(forkedProjects.map(repo => {
            return fetchRepoDetails(repo.full_name);
        }));
        dispatch(asyncFetchSuccessGetRepos(parentRepoNames));
    } catch (err) {
        console.log(err.message)
    }
};

export const fetchPullRequests = (username) => async (dispatch) => {
    try {
        dispatch(asyncFetchGetPullRequests());
        const events_URL = `https://api.github.com/users/${username}/events`;
        const eventsResponse = await fetch(events_URL);
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

        dispatch(asyncFetchSuccessGetPullRequests(pullRequests));
    } catch (err) {
        console.log(err.message)
    }
};
