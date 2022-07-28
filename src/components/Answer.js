import React from 'react'

const Answer = ({ number, answer, selectedAnswer, onSelect, showAnswer, correctAnswer }) => {
  const onReveal = () => {
    if (showAnswer) {
      if (answer === selectedAnswer) {
        if (answer === correctAnswer) {
          return "Questionaire-Answer-Correct"
        } else {
          return "Questionaire-Answer-Incorrect"
        }
      } else {
        if (answer === correctAnswer) {
          return "Questionaire-Answer-Correct"
        } 
      }
    }
    return ""
  }
  return (
    <button
      onClick={onSelect}
      className={`Questionaire-Answer${number} Questionaire-Answer ${selectedAnswer === answer ? "Answer-Selected" : ""} ${onReveal()}`}>
      {answer}
    </button>
  )
}

export default Answer