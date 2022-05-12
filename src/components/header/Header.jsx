import * as React from 'react';
import './Header.css'
import {AppBar, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import logo from '../../Logo.png';
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    let navigate = useNavigate();

    const navTo = (route) => {
        navigate(route);
    };

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" >
        <Toolbar>
            <Button 
                color="inherit"
                style = {{padding: "20px"}}
                onClick={() => navTo('/')}
                disableRipple
                >
                <img 
                  src={logo} 
                  width="650">
                </img>
                </Button>
            <Button 
                variant = "outlined"
                color="inherit"
                size = "large"
                onClick={() => navTo('/highscores')}
                style={{ fontSize: '40px' , margin: '20px', marginTop: '40px'}}
              >
              High Scores</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{paddingRight: "90px", paddingTop: '45px'}}>
              <Typography 
                sx = {{fontStyle: "italic", fontSize: 40}}>
                Test your knowledge
              </Typography>
              </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}