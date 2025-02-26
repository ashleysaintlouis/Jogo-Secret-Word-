/* CSS */
import "./app.css"

/* React */
import {useCallBack, useEffect, useState} from "react"

/* data */
import { wordsList } from "./data/words"

/* Component */
import StartScreen from "./components/StartScreen"
import GameOver from "./components/GameOver"
import Game from "./components/Game"

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

export function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  


  return (
    <div className="App">
      {gameStage === "start" && <StartScreen />}
      {gameStage === "game" && <Game />}
      {gameStage === "end" && <GameOver />}
    </div>
  )
}
