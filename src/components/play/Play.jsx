import React from "react";
import {useState, useContext} from "react";
import {Grid, Box, Typography, Button, Stack} from '@mui/material';
import "./Play.css";
import {Timer} from "../timer/Timer";
import {ScoreContext, TopScoresContext} from "../app/App"
import { useNavigate } from 'react-router-dom';

export const TimeContext = React.createContext();

export const Play = () => {

  const [timesUp, setTimesUp] = useState(false);
  // const {currentCategory, catDispatch} = useContext(CategoryContext);
  const [correctAnswer, setCorrectAnswer] = ([]);
  
  const [currentQuestion, setCurrentQuestion] =  useState(fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
  .then((response) => response.json())
  .then((data) => data.results[0]));
	

  const [currentAnswers, setCurrentAnswers] = useState([
      {id: 1, Answer: 'Elon Musk', correct: true, selected: false},
      {id: 2, Answer: 'Bill Gates', correct: false, selected: false},
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
    <TimeContext.Provider
      value = {{
        timesUp, setTimesUp
      }}>
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
    </TimeContext.Provider>
  );
};

const Question = (props) => {

  const currentAnswers = props.currentAnswers;
  const {score, setScore} = useContext(ScoreContext);

  const handleButtonClick = (isCorrect, id)  => {
    currentAnswers[id-1].selected = true;
    let tempScore = 0;
    if (isCorrect) {
			setScore(tempScore = score + 3);
		}
    else {
      setScore(tempScore = score-2);
    }
    setScore(tempScore);
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

  const buttonDisabled = props.answerObject.correct? 'success.main': 'error.main';
  const {timesUp, setTimesUp} = useContext(TimeContext);
  return (
    <Button 
      borderRadius={4}
      className="answer"
      variant='outlined' 
      disabled={props.answerObject.selected || timesUp}
      sx={{backgroundColor: 'primary.light', border: '5px solid',
          '&:disabled': { backgroundColor: buttonDisabled, border: '5px solid', borderColor: 'primary.main', color: 'primary.main'},}}
      onClick={() => props.handleClick(props.answerObject.correct, props.answerObject.id)}
      >
      <Typography variant='h5'>{props.answerObject.Answer}</Typography>
    </Button>
  );
}

const GameInfo = (props) => {
  const {timesUp, setTimesUp} = useContext(TimeContext);

  if(timesUp){
    return (<GameOver />);
  }
  else {
    return (<Message/>);
  }

}

const Message = () => {
  
  return (
    <Box
    borderRadius={4}
    sx={{ p: 2, 
          mt: '15px',
          border: '5px solid', 
          backgroundColor: 'primary.light', 
          borderColor: 'primary.main'}}>
      <Typography variant="h2">
        Keep on going!
      </Typography>
    </Box>
  );
}

const GameOver = () => {

  const {myScore, setMyScore} = useContext(ScoreContext);
  const {topScores, setTopScores} = useContext(TopScoresContext);
  let navigate = useNavigate();
  
  
  const handleClick = () => {
    if(myScore > topScores[4].score){
      let newArray = [];
      let newScore = [{user: "", score: myScore}];
      for(let i = 0; i<topScores.length; i++){
        console.log("listing topScores");
        console.log(topScores);
        if(myScore > topScores[i].score){
          newArray = topScores.slice(0, i);
          newArray.concat(newScore, topScores.slice(i, 5));
          setTopScores(newArray);
          console.log("in if");
          console.log("listing newArray");
          console.log(newArray);
          i = 4;
        }
      }
      navigate('/highscores');
    }
    else {
      navigate('/showScore');
    }
  }

  return (
    <Box
    borderRadius={4}
    sx={{ p: 2, 
          m: 2,
          border: '5px solid', 
          backgroundColor: 'primary.light', 
          borderColor: 'primary.main'}}>
      <Button 
        variant = "outlined"
        color="inherit"
        size = "large"
        onClick={handleClick}
        style={{ fontSize: '40px' , margin: '40px', width: '75%'}}
      >
        next
      </Button>
    </Box>
  )
}


const Score = (props) => {
  const {score, setScore} = useContext(ScoreContext);
  return (
    <Box borderRadius={4} sx={{p: 2, mt: 2, border: '5px solid', backgroundColor: 'secondary.main'}}>
         <Typography variant='h2'  style={{alignContent: 'center'}}> Score</Typography>
         <Typography variant='h1' style={{alignContext: 'center'}}>
           {score}
         </Typography>
         </Box>
  )
}