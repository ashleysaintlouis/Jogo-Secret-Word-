/* CSS */
import "./app.css"

/* React */
import { useState, useEffect } from "react"

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

  const [guessedLetters, setGessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  
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
  wordLetters = wordLetters.map((letterMap) => letterMap.toLowerCase())

  console.log(category, word)
  console.log(wordLetters)

  // fill states
  setPickedWord(word)
  setPickedCategory(category)
  setLetters(wordLetters)

    setGameStage(stages[1].name)
  }

  //process the letter input

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()
    if (
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGessedLetters((actualGessedLetters) => [
        ...actualGessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
      setGuesses((atualGuesses) => atualGuesses - 1)
    }

    console.log(guessedLetters)
    console.log(wrongLetters)
  }

  const clearLetterStates = () => {
    setGessedLetters([])
    setWrongLetters([])
    setGuesses((atualGuesses) => 3)
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  const retry = () => {
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame}/>}
      {gameStage === "game" && 
      <Game 
        verifyLetter={verifyLetter}
        pickedWord={pickedWord}
        pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}
      {gameStage === "end" && <GameOver retry={retry}/>}
    </div>
  )
}
