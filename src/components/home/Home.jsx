import React, {useState, useReducer, useEffect} from "react";
import {Box, Modal, Grid, Button, IconButton, Card, Typography, ToggleButton, ToggleButtonGroup} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { useNavigate } from 'react-router-dom';
import {CategoryReducer} from '../../state/categoryReducer';
import StartIcon from '@mui/icons-material/Start';

const categoryReducer = CategoryReducer;

export const Home = () => {
  
  const categories = [
    { id: 1, category: 'Geography'},
    { id: 2, category: 'History'},
    { id: 3, category: 'Animals'},
    { id: 4, category: 'Sports'},
    { id: 5, category: 'Random'}
  ];

  const [currentCategory, categoryDispatch] = useReducer(categoryReducer, {
    category: 'noSelection',
  });
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
        currentCategory = {currentCategory}
        setCategory = {categoryDispatch}
      />
      <PlayButton category={currentCategory} openPopup={togglePopup}/>
      <Popup open={popup}/>
      
    </div>
  );
}

const CategorySelection = (props) => {

  const handleSelect = (event, selectedCategory) => {
    if(props.currentCategory.category == selectedCategory){
      props.setCategory({type: 'noSelection'});
    }
    else {
      props.setCategory({type : selectedCategory});
    }
    console.log(props.currentCategory);
  };

  return (
    <Box sx={{ flexGrow: 10 }}>
      <ToggleButtonGroup
        value={props.currentCategory}
        exclusive
        onChange={handleSelect}
        aria-label="text alignment"
      >
        <Grid container spacing={1}>
          {props.categories.map((item) => (
            <Grid item xs = "12">
              <ToggleButton 
                value={item.category} 
                onClick={handleSelect}
                >
              <Card sx={{ minWidth: 500}}>
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
  const buttonColor = props.category.category == 'noSelection'?  ['#AEAEAE']: ['#3ACF3A'];
  
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


