import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import GetQuestionaire from '../api/GetQuestionaire';
import { AppContext } from '../App';
import Answer from './Answer';

const Questionaire = () => {

  // Unmap states from the context
  const { correct_state, answered_state, questions_state, loading_state, gameState_state } = useContext(AppContext);
  const [correctCount, setCorrectCount] = correct_state
  const [answeredCount, setAnsweredCount] = answered_state
  const [questions, setQuestions] = questions_state
  const [loading, setLoading] = loading_state
  const [gameState, setGameState] = gameState_state
  const [answers, setAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [confirmButtonStatus, setConfirmButtonStatus] = useState('Confirm')

  const [restart, setRestart] = useState(false)

  // Found: https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Found here https://stackoverflow.com/questions/56426009/using-regular-expression-to-replace-special-characters-outside-of-html-tags
  const fixQuestion = () => {
    var replaceChar = [
      { reg: '&', replace: '&amp;' },
      { reg: '"', replace: '&quot;' },
      { reg: '£', replace: '&pound;' },
      { reg: '€', replace: '&euro;' },
      { reg: 'é', replace: '&eacute;' },
      { reg: '–', replace: '&ndash;' },
      { reg: '®', replace: '&reg;' },
      { reg: '™', replace: '&trade;' },
      { reg: '‘', replace: '&lsquo;' },
      { reg: '’', replace: '&rsquo;' },
      { reg: '“', replace: '&ldquo;' },
      { reg: '”', replace: '&rdquo;' },
      { reg: '#', replace: '&#35;' },
      { reg: '#', replace: '&#035;' },
      { reg: '©', replace: '&copy;' },
      { reg: '@', replace: '&commat;' },
      { reg: '$', replace: '&dollar;' },
      { reg: '', replace: '&shy;' },
      { reg: '\\(', replace: '&#40;' },
      { reg: '\\)', replace: '&#41;' },
      { reg: '\\(', replace: '&#040;' },
      { reg: '\\)', replace: '&#041;' },
      { reg: '<', replace: '&lt;' },
      { reg: '>', replace: '&gt;' },
      { reg: '…', replace: '&hellip;' },
      { reg: '-', replace: '&#45;' },
      { reg: "'", replace: '&#39;' },
      { reg: "'", replace: '&#039;' },
      { reg: '\\*', replace: '&#42;' },
      { reg: '\\*', replace: '&#042;' },
      { reg: ',', replace: '&sbquo;' }
    ]
    for (var i = 0; i < replaceChar.length; i++) {
      let rep = replaceChar[i]
      questions[Math.min(answeredCount, 9)]['question'] = questions[Math.min(answeredCount, 9)]['question'].replace(rep['replace'], rep['reg'])
    }
  }

  const HandleConfirmButton = () => {
    if (confirmButtonStatus === 'Confirm') {
      if (answeredCount + 1 < 10) {
        if(selectedAnswer === questions[answeredCount]['correct_answer']){
          setCorrectCount(correctCount + 1)
        }
        setConfirmButtonStatus('Next')
      } else {
        setAnsweredCount(10)
        setConfirmButtonStatus('Play again')
      }
    } else if (confirmButtonStatus === 'Play again') {
      setConfirmButtonStatus('Confirm')
      setQuestions([])
      setAnswers([])
      setAnsweredCount(0)
      setCorrectCount(0)
      setRestart(true)
    }
    else {
      const question = questions[answeredCount + 1]
      const tempArr = [...question['incorrect_answers'], question['correct_answer']]
      shuffleArray(tempArr)
      setAnswers(tempArr)
      setAnsweredCount(answeredCount + 1)
      setSelectedAnswer(null)
      setConfirmButtonStatus('Confirm')
    }
  }

  const FetchData = async () => {
    if (!loading) {
      setLoading(true)
      const json = await GetQuestionaire()
      setQuestions(json['results'])
      const firstQuestion = json['results'][0]
      const tempArr = [...firstQuestion['incorrect_answers'], firstQuestion['correct_answer']]
      shuffleArray(tempArr)
      setAnswers(tempArr)
      setLoading(false)
      setRestart(false)
    }
  }

  // Use hook to call API for questions
  useLayoutEffect(() => {
    if (!loading) {
      FetchData()
    }
  }, [restart === true])

  if (!loading && questions.length > 0 && answers.length > 0) {
    fixQuestion()
    return (
      <div className={answers.length > 2 ? 'Questionaire-Window' : 'Questionaire-Window-2-Answers'}>
        <div className="Questionaire-Header">
          {questions[Math.min(answeredCount, 9)]['question']}
        </div>
        {confirmButtonStatus !== 'Confirm' &&
          <div className={`Questionaire-Response-${selectedAnswer === questions[Math.min(9, answeredCount)]['correct_answer'] ? "Correct" : "Incorrect"}`} />}
        {answers.map((x, i) => {
          return <Answer
                  number={i + 1}
                  answer={x}
                  showAnswer={confirmButtonStatus !== "Confirm"}
                  selectedAnswer={selectedAnswer}
                  correctAnswer={questions[Math.min(9,answeredCount)]['correct_answer']}
                  onSelect={() => {
                    if (confirmButtonStatus !== 'Confirm') {
                      return;
                    }
                    setSelectedAnswer(x)
                 }}
          />
        })
        }
        <button className="Questionaire-SubmitButton" onClick={HandleConfirmButton}>{confirmButtonStatus}</button>
        <div className="Questionaire-Info-Correct">Correct: {correctCount}/{answeredCount}</div>
        <div className="Questionaire-Info-Left">{Math.min(answeredCount, 9)+1}/10</div>
      </div>
    )
  }
  else {
    return (<div className='Loading-Wrapper'>
      <div className="Loading-Text"></div>
      <div className="Loading" />
    </div>)
  }

}

export default Questionaire