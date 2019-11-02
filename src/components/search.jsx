import React, { useState } from "react";
import Result from "./result";
// import fakeData from "../fakeData.json"

export const Search = () => {
  const [username, setUsername] = useState("");
  const [results, setResults] = useState({});

  const forkedRepos = async (full_name) => {
    const forkedRepos_URL = `https://api.github.com/repos/${full_name}`;
    const getForkedRepos = await fetch(forkedRepos_URL);
    const forkedReposJson = await getForkedRepos.json()
    // console.log("parent full name is", forkedReposJson.parent.full_name);
    const forkParent = forkedReposJson.parent.full_name
    const forkNameAndParent = { full_name, forkParent}
    return forkNameAndParent;
  }

  const handleGetUser = async username => {
    try {
      const repos_URL = `https://api.github.com/users/${username}/repos`;
      const events_URL = `https://api.github.com/users/${username}/events`;

      // Below is to get the forked repos
      const reposResponse = await fetch(repos_URL);
      const receivedRepos = await reposResponse.json();
      const forkedProjects = receivedRepos.filter(item => item.fork === true);
      console.log("forkeds are:", forkedProjects);
      const parentRepoNames = await Promise.all(forkedProjects.map(each => {
        // console.log("each.full_name is", each.full_name )
        return forkedRepos(each.full_name);
      }));
      console.log("parentRepoNames is", parentRepoNames)
      // console.log("eachForkedRepo is", eachForkedRepo)


      // Below is to get Pull Requests
      const eventsResponse = await fetch(events_URL);
      const receivedEvents = await eventsResponse.json();
      const pullRequests = receivedEvents.filter(
        item => item.type === "PullRequestEvent"
      );
      console.log("PRs are:", pullRequests);

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
    // return <Result result={fakeData} />;
  };

  return (
    <div>{Object.keys(results).length ? displayResult() : searchUser()}</div>
  );
};

export default Search;
