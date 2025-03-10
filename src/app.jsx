/* CSS */
import "./app.css"

/* React */
import { useState, useEffect, useCallback } from "react"

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

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

  
  console.log(words)

  const pickWordAndCategory = useCallback(() => {
    // pick a random category
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // pick a random word
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    return {word, category}
  }, [words])

  // Start the secret word game
  const startGame = useCallback(() => {
    //restart 
    clearLetterStates()
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
  }, [pickWordAndCategory])

  //process the letter input

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Check if ltter has alread been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }

    console.log(letters)
    console.log(guessedLetters)
  };

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  //check
  useEffect(() => {
    if (guesses <= 0) {
      //reset all states
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters) {
      setScore((actualScore) => (actualScore += 100))

      // restart game with new word
      startGame()
    }

    console.log(uniqueLetters)
  }, [guessedLetters, letters, startGame])

  // restarts the game
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
      {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  )
}
