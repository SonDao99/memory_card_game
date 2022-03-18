import React from "react";
import Scoreboard from './Scoreboard';

function Header(props) {
  return(
    <div className="header">
      <h1>Fun with Flags</h1>
      <Scoreboard currentScore={props.currentScore} highScore={props.highScore} />
    </div>
  )
}

export default Header;