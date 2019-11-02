import React from 'react';

export const Result = (username) => {

return (

  <div>

    <h2 className="username-header"> {username} </h2>

    <h4> Recent Forks </h4>


    <h4> Recent Pull Requests </h4>

  </div>

)

}

export default Result;
