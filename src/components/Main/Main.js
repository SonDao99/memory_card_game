import React, {useState, useEffect} from "react";
import au from '../Flags/au.svg';
import nz from '../Flags/nz.svg';
import ml from '../Flags/ml.svg';
import sn from '../Flags/sn.svg';
import nf from '../Flags/nf.svg';
import ng from '../Flags/ng.svg';
import ps from '../Flags/ps.svg';
import sd from '../Flags/sd.svg';
import vu from '../Flags/vu.svg';
import za from '../Flags/za.svg';
import eg from '../Flags/eg.svg';
import ye from '../Flags/ye.svg';
import ie from '../Flags/ie.svg';
import it from '../Flags/it.svg';
import ci from '../Flags/ci.svg';
import ru from '../Flags/ru.svg';
import si from '../Flags/si.svg';
import sk from '../Flags/sk.svg';
import nl from '../Flags/nl.svg';
import hr from '../Flags/hr.svg';
import fr from '../Flags/fr.svg';
import mq from '../Flags/mq.svg';
import is from '../Flags/is.svg';
import no from '../Flags/no.svg';

function Main(props) {
  const [level, setLevel] = useState(1);
  const [flags, setFlags] = useState([{flag: 1, img:au},
                                      {flag: 2, img:nz},
                                      {flag: 3, img:ml},
                                      {flag: 4, img:sn}
                                    ]);
  const [clicked, setClicked] = useState([]);

  const newLevel = (levelNumber) => {
    setLevel(levelNumber);
    
    if (levelNumber === 1) {
      setFlags([{flag: 1, img:au},
                {flag: 2, img:nz},
                {flag: 3, img:ml},
                {flag: 4, img:sn}
              ]);
    } else if (levelNumber === 2) {
      setFlags([{flag: 5, img:nf},
                {flag: 6, img:ng},
                {flag: 7, img:ps},
                {flag: 8, img:sd},
                {flag: 9, img:vu},
                {flag: 10, img:za},
                {flag: 11, img:eg},
                {flag: 12, img:ye},
              ]);
    } else if (levelNumber === 3) {
      setFlags([{flag: 13, img:ie},
                {flag: 14, img:it},
                {flag: 15, img:ci},
                {flag: 16, img:ru},
                {flag: 17, img:si},
                {flag: 18, img:sk},
                {flag: 19, img:nl},
                {flag: 20, img:hr},
                {flag: 21, img:fr},
                {flag: 22, img:mq},
                {flag: 23, img:is},
                {flag: 24, img:no},
              ]);
    } 

  }

  const randomizeOrder = () => {
    let oldFlagOrder = [...flags];
    const newFlagOrder = [];
    let updated = false;

    if (!updated) {
      for (let i = flags.length - 1; i >= 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        newFlagOrder.push(oldFlagOrder[randomIndex]);
        oldFlagOrder.splice(randomIndex, 1);
      }

      updated = true;

      if (updated) {
        setFlags(newFlagOrder);
      }
    }
  };

  const isRepeating = (newClickArray) => {
    for (let i = 0; i < newClickArray.length; i += 1) {
      for (let j = 0; j < newClickArray.length; j += 1) {
        if (j !== i) {
          if (newClickArray[i] === newClickArray[j]) {return true}
        }
      } 
    }
  }

  const gameOver = (newClickArray) => {
    if (!isRepeating(newClickArray) && (newClickArray.length === flags.length)) {
      return false
    } else if (isRepeating(newClickArray)) {
      return true;
    }

    return false;
  }

  const manageScore = (newClickArray) => {
    if (!gameOver(newClickArray) && (newClickArray.length === flags.length) && level === 3) {
      props.setCurrentScore(props.currentScore + 1);

      if ((props.currentScore + 1) > props.highScore) {
        props.setHighScore(props.currentScore + 1);
      }

      newLevel(1);
      setClicked([]);
      props.setCurrentScore(0);
    }
    
    else if (!gameOver(newClickArray) && (newClickArray.length === flags.length)) {
      props.setCurrentScore(props.currentScore + 1);

      if ((props.currentScore + 1) > props.highScore) {
        props.setHighScore(props.currentScore + 1);
      }

      newLevel(level+1);
      setClicked([]);

    } else if (!gameOver(newClickArray)) {
      props.setCurrentScore(props.currentScore + 1);

      if ((props.currentScore + 1) > props.highScore) {
        props.setHighScore(props.currentScore + 1);
      }

    } else {
      props.setCurrentScore(0);
      setClicked([]);
      newLevel(1);
    }
  }

  const saveClick = (chosenFlag) => {
    setClicked([...clicked].concat(chosenFlag));
    manageScore([...clicked].concat(chosenFlag))
  }

  const divOnClick = (chosenFlag) => {
    saveClick(chosenFlag);
  }

  const displayFlag = () => {
    return(flags.map((item) => {
      return(
        <div onClick={() => {divOnClick(item.flag)}}
             key={item.flag}
             className="flag"
        >
          <img src={item.img} alt='flagIcon'/>
        </div>
      )
    }))
  }

  useEffect(() => {
    randomizeOrder();
  },[props])

  return(
    <div className="main">
      <div className="levelAndInstruction">
        <div className="currentLevel">{`Level ${level}`}</div>
        <div className="instructions">{"Don't click the same flag twice!"}</div>
      </div>

      <div className="allFlags">
        {displayFlag()}
      </div>
    </div>
  )
}

export default Main;