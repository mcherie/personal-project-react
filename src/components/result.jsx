import React from "react";

export const Result = ({ result }) => {
  const { username, parentRepoNames, pullRequests } = result;
  return (
    <div>

      <h1 className="username-header"> {username} </h1>
      {/* <div style={{ textAlign: "left" }}> */}
        <div>
        <h3> Recent Forks </h3>
        <ol>
          {parentRepoNames.map(each => {
            return (
              <li key={each.full_name}>
                <a href={`https://api.github.com/users/${each.full_name}`} target="_blank" >{each.full_name}</a>
                <p>Forked from: {each.forkParent}</p>
              </li>
            )
          })}
        </ol>
      </div>

      <div>
        <h3> Recent Pull Requests </h3>
        {pullRequests.map(each => {
          return (
            <div key={each.repo.name}>
              <a href={each.payload.pull_request.url} target="_blank">{each.repo.name}</a>
              <h5>Status: {each.payload.action}</h5>
            </div>
          )
        })}
      </div>

    </div>
  );
};

export default Result;
