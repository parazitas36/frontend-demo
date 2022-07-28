import React, { useContext } from 'react'
import {AppContext} from '../App';

const Start = () => {
  const {gameState_state} = useContext(AppContext)
  const [gameState, setGameState] = gameState_state

  const changeState = () => {
    setGameState('game')
  }

  return (
    <div className="Start-Window">
      <div className="Start-Header">
        Press the Start button when you are ready
      </div>
      <button onClick={changeState} className="Start-Button">
        Start
      </button>
    </div>
  )
}

export default Start