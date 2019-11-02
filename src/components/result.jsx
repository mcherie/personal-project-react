import React from "react";

export const Result = ({ result }) => {
  const { username, parentRepoNames, pullRequests } = result;
  return (
    <div>
      <h2 className="username-header"> {username} </h2>

      <h4> Recent Forks </h4>
      {parentRepoNames.map(each => {
        console.log(each);
        
      })}
      
      <h6>Forked from: </h6>

      <h4> Recent Pull Requests </h4>
      <h6>Status: </h6>
    </div>
  );
};

export default Result;
