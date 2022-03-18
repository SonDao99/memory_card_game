import React from "react";

function Scoreboard(props) {
  return(
    <div className="scoreboard">
      <div className="maxScore">Max Score: <div>24</div></div>      
      <div className="currentScore">Current Score: <div>{props.currentScore}</div></div>
      <div className="highScore">High Score: <div>{props.highScore}</div></div>
    </div>
  )
}

export default Scoreboard;