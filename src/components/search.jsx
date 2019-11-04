import React, { useState } from "react";
import Result from "./result";

export const Search = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState({});

  // Below is helper function to get parent of forked repos
  const forkedRepos = async (full_name) => {
    const forkedRepos_URL = `https://api.github.com/repos/${full_name}`;
    const getForkedRepos = await fetch(forkedRepos_URL);
    const forkedReposJson = await getForkedRepos.json()
    const forkParent = forkedReposJson.parent.full_name
    const forkNameAndParent = { full_name, forkParent}
    return forkNameAndParent;
  }

  const handleGetUser = async username => {
    try {

      // ------------------------------------------------
      // Below is to get the FORKED REPOS
      const repos_URL = `https://api.github.com/users/${username}/repos`;
      const reposResponse = await fetch(repos_URL);
      const receivedRepos = await reposResponse.json();
      const forkedProjects = receivedRepos.filter(item => item.fork === true);
      const parentRepoNames = await Promise.all(forkedProjects.map(each => {
        return forkedRepos(each.full_name);
      }));


      // ---------------------------------------------------
      // Below is to get Pull Requests
      const events_URL = `https://api.github.com/users/${username}/events`;
      const eventsResponse = await fetch(events_URL);
      const receivedEvents = await eventsResponse.json();
      const allPullRequests = receivedEvents.filter(
        item => item.type === "PullRequestEvent"
      );

      const uniquePullRequests = [];

      allPullRequests.forEach(item => {
        const url = item.payload.pull_request.url;
        if (uniquePullRequests.indexOf(url) === -1) {
          uniquePullRequests.push(url);
        }
      });

      const initialPullRequests = uniquePullRequests.map(async item => {
        const response = await fetch(item);
        const responseObj = await response.json();
        return responseObj
      });
      const pullRequests = await Promise.all(initialPullRequests)


      const results = { username, parentRepoNames, pullRequests };

      setResults(results);

    } catch (err) {
      console.log(err.message);
    }
  };

  const searchUser = () => {
    return (
      <div>
        <p>Github Username:</p>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <div>
          <button
            type="button"
            onClick={() => {
              handleGetUser(username);
            }}
          >
            GET USER
          </button>
        </div>
      </div>
    );
  };

  const displayResult = () => {
    return <Result result={results} />;
  };

  return (
    <div>{Object.keys(results).length ? displayResult() : searchUser()}</div>
  );
};

export default Search;
