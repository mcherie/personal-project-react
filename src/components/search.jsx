import React, { useState } from "react"
import Result from "./result"

export default () => {

  const [ username, setUsername ] = useState("")

  const handleGetUser = async (username) => {
    try {
      console.log("hello first")

      const repos_URL = `https://api.github.com/users/${username}/repos`
      const events_URL = `https://api.github.com/users/${username}/events`

      // Below is to get the forked repos
      const reposResponse = await fetch(repos_URL)
      const receivedRepos = await reposResponse.json()
      const forkedProjects = receivedRepos.filter(item => item.fork === true )


      // Below is to get Pull Requests
      const eventsResponse = await fetch(events_URL)
      const receivedEvents = await eventsResponse.json()
      const pullRequests = receivedEvents.filter(item => item.type === "PullRequestEvent")

      console.log("hello")

      return (
        <Result username ={username} forkedProjects={forkedProjects} pullRequests={pullRequests}/>
      )

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div> 
      <p>Github Username:</p>
    <input value={username} onChange={e => setUsername(e.target.value)}/> 
    <div>
        <button onClick={handleGetUser(username)}>GET USER</button>
      </div>
    </div>

  )
}

