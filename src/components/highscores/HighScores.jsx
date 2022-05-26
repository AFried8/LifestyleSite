import React, { useContext, useEffect, createRef} from 'react'
import {TopScoresContext} from "../app/App"
import {Typography, Box, Button, Stack, Grid} from '@mui/material';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import CameraAlt from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import { useNavigate } from 'react-router-dom';

export const HighScores = () => {
  const {topScores, setTopScores} = useContext(TopScoresContext);
  let currentIndex = 1;
  let navigate = useNavigate();

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot()
  
  const download = (image, { name = 'img', extension = 'png' } = {}) => {
    const a = document.createElement('a')
    a.href = image
    a.download = createFileName(extension, name)
    a.click()
  }
  
  const getImage = () => takeScreenShot(ref.current)

  useEffect(() => {
    if (image) {
      download(image, { name: 'TriviaStuffHighScores', extension: 'png' })
    }
  }, [image])

  function replayClicked() {
    navigate('/');
  }

  return (
    <div>
      <div ref={ref}>
        <Box  
          borderRadius={4}
          sx={{ p: 2, 
                m: 2,
                border: '5px solid', 
                backgroundColor: 'primary.light', 
                borderColor: 'primary.main'}}>
        <Typography variant='h2' padding='10px' color='primary.main'>
          High Scores
        </Typography>
        <Box sx={{width: '100%'}}>
          {topScores.map((item) => (
            <HighScore
              highscore={item}
              number={currentIndex++}
            />
          ))}
          </Box>
        </Box>
      </div>
      
      <Box  
        borderRadius={4}
        sx={{ p: 2, 
              m: 2,
              border: '5px solid', 
              backgroundColor: 'primary.light', 
              borderColor: 'primary.main'}}>
        <Stack direction="row">
          <Grid container>
          <Grid item xs={6}>
            <Button 
              startIcon = {<CameraAlt style={{fontSize: 40}}/>}
              borderRadius={4}
              sx={{ backgroundColor: 'primary.light', border: '1px solid', pl: 3, pr: 3}}
              onClick={getImage}
            >
            <Typography variant='h5'>Take Screenshot</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
          <Button 
              startIcon = {<ReplayIcon style={{fontSize: 40}}/>}
              borderRadius={4}
              sx={{ backgroundColor: 'primary.light', border: '1px solid', pl: 3, pr: 3}}
              onClick={replayClicked}
          >
            <Typography variant='h5'>Replay</Typography>
          </Button>
          </Grid>
          </Grid>
        </Stack>
      </Box>
    </div>
  );
};

const HighScore = (props) => {
   
  const displayScore = props.highscore.user == 0? "": -  props.highscore.score;
  return (
    
    <Box component="p" sx={{m: 4, mr:20, ml:20, alignContent: 'center', backgroundColor: 'secondary.main', borderRadius: 2 }}>
      <Typography variant="h4" align="left" sx={{p: 1, m:2}}>
        {props.number}. {props.highscore.user}   {displayScore}
      </Typography>
    </Box>

  )
}

