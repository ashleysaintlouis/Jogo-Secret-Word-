
import "./GameOver.css"

const GameOver = ({retry}) => {
  return (
    <div>
        <h1 className="gameOver">Fim do jogo!</h1>
        <p className="text-points">A sua pontuação foi: <span className="points">200</span></p>
        <div>
            <button onClick={retry}>Resetar o Jogo</button>
        </div>
    </div>
  )
}

export default GameOver