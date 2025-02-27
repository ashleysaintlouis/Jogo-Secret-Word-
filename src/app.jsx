/* CSS */
import "./app.css"

/* React */
import { useState } from "react"

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
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  
  console.log(words)

  const pickWordAndCategory = () => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word, category}
  }

  // Start the secret word game
  const startGame = () => {
  // pick word and pick Category
  const {word, category} = pickWordAndCategory()
  let wordLetters = word.split("")
  wordLetters = wordLetters.map((letter) => letter.toLowerCase())

  console.log(category, word)
  console.log(wordLetters)

  // fill states
  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)


    setGameStage(stages[1].name)
  }

  //process the letter input

  const verifyLetter = () => {
    setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && <Game verifyLetter={verifyLetter}/>}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  )
}
