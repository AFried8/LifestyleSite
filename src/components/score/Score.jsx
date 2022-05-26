import React, {useContext} from 'react'
import {Typography, Button, Box} from '@mui/material';
import {ScoreContext} from "../app/App"
import HappyEmoji from '../../HappyEmoji.png'
import badEmoji from '../../badEmoji.png'




export const Score = () => {

const {currentScore, setCurrentScore} = useContext(ScoreContext);

  return(
    <Box  
      borderRadius={4}
      sx={{ p: 2, 
            m: 4,
            border: '5px solid', 
            backgroundColor: 'primary.light', 
            borderColor: 'primary.main'}}>
    
    <span>
    <Typography variant='h1'>
      Your Score:
    </Typography>
      <img src={currentScore>0? HappyEmoji: badEmoji} width={200}/></span>
    <Typography sx={{fontSize: 230}}>
      {currentScore}
    </Typography>
    
    
    </Box>
  );
}

