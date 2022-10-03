import './GameOver.css'

const GameOver = ({retry, score}) => {
  return (
    <div>
      <h1>Game Over</h1>
      <h2>
        Sua Pontuação foi de 
        <span> {score}</span>
      </h2>
      <button onClick={retry}>Reiniciar o Jogo</button>
    </div>
  )
}

export default GameOver