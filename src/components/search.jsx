import React, { useState, useEffect } from "react"

export default () => {

  const [ username, setUsername ] = useState("")

  const handleGetUser = async (username) => {
    try {
      const repos_URL = `https://api.github.com/users/${username}/repos`
      const events_URL = `https://api.github.com/users/${username}/events`

      const reposResponse = await fetch(repos_URL)
      const eventsResponse = await fetch(events_URL)

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

