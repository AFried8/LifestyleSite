import React from "react";
import {useState, useContext} from "react";
import {Box, Typography, Button, Modal, TextField} from '@mui/material';
import {ScoreContext, TopScoresContext} from "../app/App"
import {TimeContext} from "../play/Play"
import { useNavigate } from 'react-router-dom';


export const GameInfo = (props) => {
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

    const {currentScore, setCurrentScore} = useContext(ScoreContext);
    const {topScores, setTopScores} = useContext(TopScoresContext);
    const [username, setUsername] = useState("");

    const highScore = currentScore > topScores[topScores.length-1].score;
    let navigate = useNavigate();
    
    function handleClick() {
      if(highScore) {
        let newArray = [];
        let newScore = {user: username, score: currentScore};
        
        for(let i = 0; i< topScores.length; i++){
          if(currentScore > topScores[i].score){
            newArray = topScores.slice(0, i);
            newArray = newArray.concat(newScore, topScores.slice(i, 4));
            setTopScores(newArray);
            i = topScores.length;
          }
        }
        navigate('/highscores');
      }
      else {
        navigate('/score');
      }
    }
  
    return (
      <div>
      <Box
      borderRadius={4}
      sx={{ p: 2, 
            mt: 2,
            mb: 2,
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
      <Popup 
        open={highScore} 
        setUsername = {setUsername}
        handleClick = {handleClick}/>
      </div>
    )
  }

  const Popup = (props) => {
  
    const [open, setOpen] = useState(props.open);

    function handleChange(event){
      props.setUsername(event.target.value);
      
  };

    const handleClick = () => {
        props.handleClick();
      setOpen(false);
    }
  
    return (
      <div>
      <Modal
        open={open}
      >
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4}}>
          <Typography id="modal-modal-description" variant="h4" align='center' sx={{ mt: 2 }}>
            You made a high score!
          </Typography>
          <Typography id="modal-modal-description" variant="h5" align='center' sx={{ mt: 2 }}>
            Enter your name
          </Typography>
          <TextField id="outlined-basic" variant="outlined" onChange={handleChange}/>
          <Button 
            variant="contained" 
            color='success' 
            onClick = {handleClick}
            sx = {{margin: 4}}>
            Submit
          </Button>
        </Box>
      </Modal>
      </div>
    );
  }