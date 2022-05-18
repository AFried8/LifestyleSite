import React, {useContext} from "react";
import {TopScoresContext} from "../app/App"

export const HighScores = () => {
  const {topScores, setTopScores} = useContext(TopScoresContext);
  return (
    <div>{topScores[1].score}
    </div>
  );
};