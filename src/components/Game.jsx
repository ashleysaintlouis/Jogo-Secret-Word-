import "./Game.css"
import { useRef, useState } from "react"

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    guessedLetters,
    letters,
    wrongLetters,
    guesses,
    score,
}) => {
    const [letter, setLetter] = useState()
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyLetter(letter)
        setLetter("")
        letterInputRef.current.focus()
    }
  return (
    <div className="game">
        <p className="point">
        <span>Pontuação: {score}</span>
        </p>
        <h1>Adivinhe a palavra:</h1>
        <h3 className="tip">Dica sobre a palavra: <span>{pickedCategory}</span></h3>
        <p>Você ainda tem {guesses} tentativa(s).</p>
        
        <div className="wordContainer">
            {letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
                <span key={i} className="letter">
                {letter}
                </span>
            ) : (
                <span key={i} className="blankSquare"></span>
            )
            )}
        </div>
        <div className="letterContainer">
            <p>Tente advinhar uma letra da Palavra: </p>
            <form className="form-blok" onSubmit={handleSubmit}>
                <input 
                type="text" 
                name="letter" 
                maxLength="1" 
                required
                onChange={(e) => setLetter(e.target.value)}
                value={letter}
                ref={letterInputRef}
                />

                <button>Jogar!</button>
            </form>

            <div className="wrongLettersContainer">
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, i) => (
                <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
        {/* <h1>Game</h1>
        <div>
            <button onClick={verifyLetter}>Finalizar o Jogo</button>
        </div> */}
    </div>
  )
}

export default Game