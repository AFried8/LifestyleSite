import React, { useEffect } from "react";
import {useState, useContext} from "react";
import {Grid, Box, Typography, Button, Stack} from '@mui/material';
import "./Play.css";
import {Timer} from "../timer/Timer";
import {GameInfo} from "../gameInfo/GameInfo";
import {CategoryContext} from "../app/App";

export const TimeContext = React.createContext();

export const Play = () => {

 
  const [timesUp, setTimesUp] = useState(false);
  const {category, setCategory} = useContext(CategoryContext); 
  const [currentProblem, setCurrentProblem] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState();  
  const [currentQuestion, setCurrentQuestion] =  useState();
  const [doneQuestion, setDoneQuestion] = useState(false);

  const [currentAnswers, setCurrentAnswers] = useState([      
    {id: 1, Answer: 'Bill Gates', correct: false, selected: false},
    {id: 2, Answer: 'Elon Musk', correct: true, selected: false},
    {id: 3, Answer: 'Steve Jobs', correct: false, selected: false},
    {id: 4, Answer: 'Henry Ford', correct: false, selected: false}
  ]);

  const categoryObjects = [
    { category: 'Geography', url: 'https://opentdb.com/api.php?amount=1&category=22&type=multiple'},
    { category: 'History', url: 'https://opentdb.com/api.php?amount=1&category=23&type=multiple' },
    { category: 'Animals', url: 'https://opentdb.com/api.php?amount=1&category=27&type=multiple' },
    { category: 'Sports', url: 'https://opentdb.com/api.php?amount=1&category=21&type=multiple' },
    { category: 'Random', url: 'https://opentdb.com/api.php?amount=1&type=multiple' }
  ]

  const [currentURL, setCurrentURL] = useState(categoryObjects[category].url);
  
  useEffect( () => {
    fetch(currentURL)
    .then((response) => response.json())
    .then((data) => setCurrentProblem(data.results[0]))
  },[doneQuestion])

  useEffect(() => {
    updateQuestion(currentProblem)
  }, [currentProblem])
	
  function updateQuestion (question){
    setCurrentQuestion(question.question);
    setCurrentAnswer(question.incorrect_answers);
    setCorrectAnswer(question.correct_answer);

  }

  useEffect(() => {
    addCorrectAnswer();
  }, [currentQuestion])

  function addCorrectAnswer(){    
    let randomNumber = Math.ceil(Math.random()*10)%4;
    let newArray = currentAnswer.slice(0, randomNumber);
    newArray = newArray.concat(correctAnswer, currentAnswer.slice(randomNumber, 4));
    setCurrentAnswer(newArray);
  }

  useEffect(() => {
    var newArray2 = [];
    for(var i = 0; i< 4; i++){
      newArray2[i] = {id: i+1, Answer: currentAnswer[i], correct: currentAnswer[i]==correctAnswer? true: false, selected: false}
    }
    setCurrentAnswers(newArray2);
  }, [currentAnswer])

    
  

  function handleClick() {
    console.log(currentProblem);
    console.log(currentAnswer);
    console.log(correctAnswer);
    console.log(currentQuestion);
    console.log(category);
    console.log(currentURL);
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
              currentQuestion ={currentQuestion}
              currentAnswers={currentAnswers}
              doneQuestion = {doneQuestion}
              setDoneQuestion = {setDoneQuestion}/>
            <GameInfo/>
          </Grid>
          <Grid item xs={4}>
            <Stack>
              <Timer/>
              <Score/>
              <Button onClick = {handleClick}>
              log
              </Button>
            </Stack>
            
          </Grid>
          </Grid>
      </div>
    </TimeContext.Provider>
  );
};

const Question = (props) => {

  const currentAnswers = props.currentAnswers;
  const {currentScore, setCurrentScore} = useContext(ScoreContext);
  const handleButtonClick = (isCorrect, id)  => {
    currentAnswers[id-1].selected = true;
    let tempScore = 0;
    if (isCorrect) {
			setCurrentScore(tempScore = currentScore + 3);
      props.setDoneQuestion(!props.doneQuestion);
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
        {props.currentQuestion}
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
      variant='outlined' 
      disabled={props.answerObject.selected || timesUp}
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
    <Box borderRadius={4} sx={{p: 2, mt: 2, border: '5px solid', backgroundColor: 'primary.main'}}>
         <Typography variant='h2'  style={{alignContent: 'center', color: 'white'}}> Score:</Typography>
         <Typography variant='h1' style={{alignContext: 'center', color: 'white'}}>
           {currentScore}
         </Typography>
         </Box>
  )
}

