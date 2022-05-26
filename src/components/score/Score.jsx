import React, {useContext, useEffect, createRef} from 'react'
import {Typography, Button, Box, Stack, Grid} from '@mui/material';
import {ScoreContext} from "../app/App"
import HappyEmoji from '../../HappyEmoji.png'
import badEmoji from '../../badEmoji.png'
import { useScreenshot, createFileName } from 'use-react-screenshot';
import CameraAlt from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import ListBulleted from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from 'react-router-dom';


export const Score = () => {

  const {currentScore, setCurrentScore} = useContext(ScoreContext);
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot()
  let navigate = useNavigate();
  
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

  function seeHighscoresClicked() {
    navigate('/highscores');
  }
  
    return(
      <div>
        <div ref={ref}>
        <Box  
          borderRadius={4}
          sx={{ p: 0, 
                m: 3,
                border: '5px solid', 
                backgroundColor: 'primary.light', 
                borderColor: 'primary.main'}}
        >
        <Typography variant='h1'>
          Your Score:
        </Typography>
        <img src={currentScore>0? HappyEmoji: badEmoji} width={200}/>
        <Typography sx={{fontSize: 230}}>
          {currentScore}
        </Typography>
        </Box>
        </div>
        <Box  
          borderRadius={4}
          sx={{ p: 2, 
                m: 2,
                border: '5px solid', 
                backgroundColor: 'primary.light', 
                borderColor: 'primary.main'}}
        >
        <Stack direction="row">
          <Grid container>
          <Grid item xs={4}>
            <Button 
              startIcon = {<CameraAlt style={{fontSize: 40}}/>}
              borderRadius={4}
              sx={{ backgroundColor: 'primary.light', border: '1px solid', pl: 3, pr: 3}}
              onClick={getImage}
            >
            <Typography variant='h5'>Take Screenshot</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button 
                startIcon = {<ListBulleted style={{fontSize: 40}}/>}
                borderRadius={4}
                sx={{ backgroundColor: 'primary.light', border: '1px solid', pl: 3, pr: 3}}
                onClick={seeHighscoresClicked}
            >
              <Typography variant='h5'>See highscores</Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
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
}

