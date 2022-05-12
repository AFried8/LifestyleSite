import React from "react";
import {useState} from "react";
import {Grid} from '@mui/material';
import {CategoryReducer} from '../../state/categoryReducer';
import { Shuffle } from "@mui/icons-material";


export const Play = () => {

  const {currentCategory, catDispatch} = useContext(CategoryContext);


  const [currentQuestion, setCurrentQuestion] = useState(fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
                                                          .then((response) => response.json()));
	const [score, setScore] = useState(0);
  const [currentAnswers, setCurrentAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const updateQuestion = () =>{
    fetch("https://z36h06gqg7.execute-api.us-east-1.amazonaws.com/chats")
      .then((response) => response.json())
      .then((data) => setCurrentQuestion(data.Results[0]));
      updateAnswers();
  }

  const updateAnswers = () => {
    var tempCurrentAnswers = [...currentQuestion.incorrect_answers];
    setCorrectAnswer(currentQuestion.correct_answer);
    tempCurrentAnswers.concat(currentQuestion.correct_answer);
    tempCurrentAnswers = shuffle(tempCurrentAnswers);
    setCurrentAnswers(tempCurrentAnswers);
  }

  function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
  }
  

  const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 3);
		}
    else {
      setScore(score-2);
    }
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
      <div className='question-section'>
          <div className='question-text'>{currentQuestion.question}</div>
        </div>
        <div className='answer-section'>
          {currentAnswers.map((answerOption) => (
            <button onClick={() => handleAnswerOptionClick(answerOption == correctAnswer)}>
              {answerOption}</button>
          ))}
        </div>
          game
        </Grid>
        <Grid item xs={4}>
          score
        </Grid>
        </Grid>
    </div>
  );
};