
import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
        <h1>Game Over</h1>
        <div>
            <button onClick={retry}>Resetar o Jogo</button>
        </div>
    </div>
  )
}

export default GameOver