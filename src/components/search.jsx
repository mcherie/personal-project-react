import React, { useState } from "react"
import Result from "./result"

export const Search = () => {

  const [ username, setUsername ] = useState("")

  const handleGetUser = async (username) => {
    try {
      const repos_URL = `https://api.github.com/users/${username}/repos`
      const events_URL = `https://api.github.com/users/${username}/events`

      // Below is to get the forked repos
      const reposResponse = await fetch(repos_URL)
      const receivedRepos = await reposResponse.json()
      const forkedProjects = receivedRepos.filter(item => item.fork === true )
      console.log("forkeds are:", forkedProjects)

      // Below is to get Pull Requests
      const eventsResponse = await fetch(events_URL)
      const receivedEvents = await eventsResponse.json()
      const pullRequests = receivedEvents.filter(item => item.type === "PullRequestEvent")
      console.log("PRs are:", pullRequests)

      const results = [forkedProjects, pullRequests]

      return results

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div> 
      <p>Github Username:</p>
    <input value={username} onChange={e => setUsername(e.target.value)}/> 
    <div>
        <button type="button" onClick={() => {
          handleGetUser(username)
          return (
            <Result 
              username={username} 
              // forkedProjects={forkedProjects} 
              // pullRequests={pullRequests} 
            />
          )
        }}>GET USER</button>
      </div>
    </div>

  )
}

export default Search;