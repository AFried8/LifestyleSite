import React from "react";
import {useState, useContext} from "react";
import {Grid, Box, Typography, Button, Stack, Modal, TextField} from '@mui/material';
import "./Play.css";
import {Timer} from "../timer/Timer";
import {GameInfo} from "../gameInfo/GameInfo";
import {ScoreContext, TopScoresContext} from "../app/App"

export const TimeContext = React.createContext();
export const CorrectSelectedContext = React.createContext();

export const Play = () => {

  const [timesUp, setTimesUp] = useState(false);
  const [correctSelected, setCorrectSelected] = useState(false);

  const [correctAnswer, setCorrectAnswer] = ([]);
  
  const [currentQuestion, setCurrentQuestion] =  useState(fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
  .then((response) => response.json())
  .then((data) => data.results[0]));
	

  const [currentAnswers, setCurrentAnswers] = useState([
      
      {id: 1, Answer: 'Bill Gates', correct: false, selected: false},
      {id: 2, Answer: 'Elon Musk', correct: true, selected: false},
      {id: 3, Answer: 'Steve Jobs', correct: false, selected: false},
      {id: 4, Answer: 'Henry Ford', correct: false, selected: false}
    ]);
  
  const updateQuestion = () =>{
    fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
      .then((response) => response.json())
      .then((data) => setCurrentQuestion(data.Results));
      updateAnswers();
  }

  const updateAnswers = () => {
    var tempCurrentAnswers = [currentQuestion.incorrect_answers];
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
  
  return (
    <TimeContext.Provider value = {{timesUp, setTimesUp }}>
      <CorrectSelectedContext.Provider value = {{correctSelected, setCorrectSelected}}>
        <div>
          <Grid container spacing={2} padding='20px'>
            <Grid item xs={8}>
              <Question
                currentAnswers={currentAnswers}/>
              <GameInfo/>
            </Grid>
            <Grid item xs={4}>
              <Stack>
                <Timer/>
                <Score/>
              </Stack>
              
            </Grid>
            </Grid>
        </div>
      </CorrectSelectedContext.Provider>
    </TimeContext.Provider>
  );
};

const Question = (props) => {

  const currentAnswers = props.currentAnswers;
  const {currentScore, setCurrentScore} = useContext(ScoreContext);
  const {correctSelected, setCorrectSelected} = useContext(CorrectSelectedContext);

  const handleButtonClick = (isCorrect, id)  => {
    currentAnswers[id-1].selected = true;
    let tempScore = 0;
    if (isCorrect) {
			setCurrentScore(tempScore = currentScore + 3);
      setCorrectSelected(true);
		}
    else {
      setCurrentScore(tempScore = currentScore-2);
    }
    setCurrentScore(tempScore);
  }

  return (
    <Box  
      borderRadius={4}
      sx={{ p: 2, 
            border: '5px solid', 
            backgroundColor: 'primary.light', 
            borderColor: 'primary.main'}}>
      <Typography variant='h2' padding='10px' color='primary.main'>
        Who owns Tesla?
      </Typography>
      <Stack  justifyContent='center' spacing={2} mt={3} >
        {currentAnswers.map((item) => (
          <Answer
            handleClick = {handleButtonClick}
            answerObject = {item}
          />
        ))}
        </Stack>
      </Box>
  );
}
const Answer = (props) => {

  const {timesUp, setTimesUp} = useContext(TimeContext);
  const {correctSelected, setCorrectSelected} = useContext(CorrectSelectedContext);
  const buttonDisabled = props.answerObject.correct? 'success.main': 'error.main';
  return (
    <Button 
      borderRadius={4}
      variant='outlined' 
      disabled={props.answerObject.selected || timesUp || correctSelected}
      sx={{ backgroundColor: 'primary.light', border: '5px solid', 
          '&:disabled': {backgroundColor: buttonDisabled, border: '5px solid', borderColor: 'primary.main', color: 'black'},}}
      onClick={() => props.handleClick(props.answerObject.correct, props.answerObject.id)}
      >
      <Typography variant='h5'>{props.answerObject.Answer}</Typography>
    </Button>
  );
}

const Score = (props) => {
  const {currentScore, setCurrentScore} = useContext(ScoreContext);
  return (
    <Box borderRadius={4} sx={{p: 2, mt: 2, border: '5px solid', backgroundColor: 'secondary.main'}}>
         <Typography variant='h2'  style={{alignContent: 'center'}}> Score:</Typography>
         <Typography variant='h1' style={{alignContext: 'center'}}>
           {currentScore}
         </Typography>
         </Box>
  )
}

