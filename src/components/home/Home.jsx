import React, {useState, useReducer, useEffect, useContext} from "react";
import {Box, Modal, Grid, Button, IconButton, Card, Typography, ToggleButton, ToggleButtonGroup} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useNavigate } from 'react-router-dom';
import {CategoryContext} from '../app/App';
import StartIcon from '@mui/icons-material/Start';

export const Home = () => {
  
  const categories = [
    { id: 0, category: 'Geography'},
    { id: 1, category: 'History'},
    { id: 2, category: 'Animals'},
    { id: 3, category: 'Sports'},
    { id: 4, category: 'Random'}
  ];

  const {category, setCategory} = useContext(CategoryContext);
  const [popup, setPopup] = useState(false);
  function togglePopup(){
    const newStatus = !popup;
    setPopup(newStatus);
  }

  return (
    <div style={{padding: "20px", alignContent: 'center'}}>
      <Typography
        variant = "h1"
        style = {{padding: "16px", paddingBottom: "31px"}}>
        Pick a category
      </Typography>
      <CategorySelection
        categories={categories}
        currentCategory = {category}
        setCategory = {setCategory}
      />
      <PlayButton category={category} openPopup={togglePopup}/>
      <Popup open={popup}/>
      
    </div>
  );
}

const CategorySelection = (props) => {

  const handleSelect = (event, selectedCategory) => {
    if(props.currentCategory == selectedCategory){
      props.setCategory(-1);
    }
    else {
      props.setCategory(selectedCategory);
    }
    console.log(props.currentCategory);
  };

  return (
    <Box sx={{ flexGrow: 10 }}>
      <ToggleButtonGroup
        value={props.currentCategory}
        exclusive
        onChange={handleSelect}
      >
        <Grid container spacing={1}>
          {props.categories.map((item) => (
            <Grid item xs = {12}>
              <ToggleButton
                value={item.id} 
                onClick={handleSelect}
                >
              <Card sx={{ minWidth: 500, backgroundColor: props.currentCategory==item.id? 'lightgray': 'white'}}>
                <Typography 
                  sx={{ fontSize: 30}} 
                  color="text.secondary" gutterBottom>
                  {item.category}
                </Typography>
              </Card>
              </ToggleButton>
            </Grid>
          ))}
        </Grid>
      </ToggleButtonGroup>
    </Box>
  );
}

const PlayButton = (props) => {
  const buttonColor = props.category == -1?  ['#AEAEAE']: ['#3ACF3A'];
  
  return (
    <IconButton 
      disabled={props.category.category == 'noSelection'}
      onClick={props.openPopup}
      >
      <PlayCircleIcon style={{ color: buttonColor, fontSize: '80px'}}/>
    </IconButton>
  );
}

const Popup = (props) => {
  let navigate = useNavigate();

  function navToPlay() {
      navigate('/Play')
  }
  
  return (
    <div>
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4}}>
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          Once you press start, the game will begin. You will have one minute
          to complete as many questions as you can. Correct answers earn you 
          3 points and wrong ones will deduct 2. 
        </Typography>
        <Button 
          variant="contained" 
          color='success' 
          onClick={navToPlay}
          endIcon={<StartIcon />}>
          Start
        </Button>
      </Box>
    </Modal>
    </div>
  );
}


