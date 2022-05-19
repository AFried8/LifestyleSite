import React, {useContext} from "react";
import {TopScoresContext} from "../app/App"
import {Typography} from '@mui/material';

export const HighScores = () => {
  const {topScores, setTopScores} = useContext(TopScoresContext);

  return (
    <div>
      <Typography>{topScores[1].score}</Typography>
    </div>
  );
};