import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import Questionaire from './components/Questionaire';
import Start from './components/Start';
import TopBar from './components/TopBar';

export const AppContext = createContext();

const App = () => {
  
  // Declare required states
  const [gameState, setGameState] = useState('start')
  const [correctCount, setCorrectCount] = useState(0)
  const [answeredCount, setAnsweredCount] = useState(0)
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  // Put states in the object that is gonna be transfered through the context
  const values = {
    gameState_state: [gameState, setGameState],
    correct_state: [correctCount, setCorrectCount],
    answered_state: [answeredCount, setAnsweredCount],
    questions_state: [questions, setQuestions],
    loading_state: [loading, setLoading]
  }

  return (
    <AppContext.Provider value={values}>
      <div className="App">
        <TopBar />
        <div className="Questionaire">
                {gameState === 'start' && <Start /> }
                {gameState === 'game' && <Questionaire/> }
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
