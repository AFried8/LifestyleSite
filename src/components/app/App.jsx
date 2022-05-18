import './App.css';
import React, {useState} from "react";
import {Header} from '../header/Header';
import {Home} from '../home/Home';
import {Play} from '../play/Play';
import {ShowScore} from '../showScore/ShowScore';
import {HighScores} from '../highscores/HighScores';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Theme} from '../../state/theme';
import {ThemeProvider, createTheme } from '@mui/material/styles';

const theme = Theme;

export const ScoreContext = React.createContext();
export const TopScoresContext = React.createContext();

function App() {

  const [score, setScore] = useState(0);
  const [topScores, setTopScores] = useState([{user: "", score: 5}, {user: "", score: 0}, {user: "", score: 0}, {user: "", score: 0}, {user: "", score: 0},]);

  return (
    <ThemeProvider theme={theme}>
      <ScoreContext.Provider
          value={{score, setScore}}>
        <TopScoresContext.Provider 
          value={{topScores, setTopScores}}
          >
          <div className="App">
          <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} /> 
                <Route path="/highscores" element={<HighScores />}/>
                <Route path="/showScore" element={<ShowScore />}/>
            </Routes>
          </BrowserRouter>
          </div>
          </TopScoresContext.Provider>
      </ScoreContext.Provider>
    </ThemeProvider>
  );
}

export default App;
