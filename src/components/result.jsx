import React from "react";
import Card from './Card';
import './result.css';

export const Result = ({repos, pullRequests, userName}) => {
  return (
    <section className="result">
      <h1 className="username-header"> {userName} </h1>
        <Card >
        {console.log("username is:", userName)}
            <div>
            <h2> Recent Forks </h2>
          {
            console.log("repos is: 1", repos)
            }
          {repos.length > 0 ? repos.map((eachFork, index) => {
                return (
                  <Card key={index}>
                  <div >
                    <a href={`https://github.com/${eachFork.repoName}`} target="_blank">{eachFork.repoName}</a>
                    <p className="subtitle">Forked from: {eachFork.forkParent}</p>
                  </div>
                  </Card>

                )
              }) : <span>No recent forks</span>}
          </div>
      </Card>
      <Card >
          <div>
            <h2> Recent Pull Requests </h2>
          {console.log("pullRequests is: 2", pullRequests)}
            {pullRequests.length > 0 ? pullRequests.map((eachPR, index) => {
              return (
                <Card key={index}>
                <div >
                  <a href={eachPR.html_url} target="_blank">{eachPR.title}</a>
                  <h5>Status: {eachPR.state}</h5>
                </div>
                </Card>
              )
            }) : <span>No open PRs</span>}
          </div>
        </Card>
    </section>
  );
};

export default Result;
