/* Css */
import './App.css';

/* React */
import {useCallback, useEffect, useState} from 'react';

/* data */
import {wordsList} from './data/words'

/* Components */
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages =[
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
]

let guessesQty

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState("")
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () =>{
    const categories = Object.keys(words); //fornece um array com todas as chaves
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)]

    const word = words[category][Math.floor(Math.random()*words[category].length)]

    return { word, category }
  }

  //Começa o jogo:
  const startGame = ()=>{
    //escolher a palavra e categoria
    const { word, category } = pickWordAndCategory()
    numberOfGuesses()

    //fazer um array das letras
    let wordLetters = word.split('')

    wordLetters = wordLetters.map((l)=>l.toLowerCase())

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)



    setGameStage(stages[1].name)
  }

  //process the letter input
  const verifyLetter = (letter) =>{
    
    const normalizedLetter = letter.toLowerCase()

    //checar se a letra já foi utilizada
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    //push da letra correta ou remover tentativa

    if(letters.includes(normalizedLetter)){

      setGuessedLetters((actualGuessedLetters)=>[
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters)=>[
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses)=> actualGuesses -1)
    }
  }


  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(()=>{
    //reset all stages
    
    
    if (guesses <= 0){
      setGameStage(stages[2].name)
      clearLetterStates()
    }
  }, [guesses])

  // reinicia o jogo
  const retry =() =>{
    setScore(0)
    setGameStage(stages[0].name)
  }



  const numberOfGuesses = ()=>{
    let guessesNumber = prompt("escolha o número de palpites")

    if (guessesNumber != null){
      setGuesses(guessesNumber)
    } 

    console.log(guessesNumber)
  }
  

  return (
    <div className="App">
      
      {gameStage === 'start' && <StartScreen startGame={startGame} /> }
      {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} /> }
      {gameStage === 'end' && <GameOver retry={retry} score={score}/> }

    </div>
  );
}

export default App;
