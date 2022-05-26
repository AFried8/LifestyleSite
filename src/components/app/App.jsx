import './App.css';
import React, {useState} from "react";
import {Header} from '../header/Header';
import {Home} from '../home/Home';
import {Play} from '../play/Play';
import {Score} from '../score/Score';
import {HighScores} from '../highscores/HighScores';
import {HashRouter, Routes, Route} from "react-router-dom";
import {Theme} from '../../state/theme';
import {ThemeProvider} from '@mui/material/styles';

const theme = Theme;

export const ScoreContext = React.createContext();
export const TopScoresContext = React.createContext();
export const CategoryContext = React.createContext();

function App() {

  const [currentScore, setCurrentScore] = useState(0);
  const [topScores, setTopScores] = useState([{user: "", score: 0}, {user: "", score: 0}, {user: "", score: 0}, {user: "", score: 0}, {user: "", score: 0},]);
  const [category, setCategory] = useState(-1);

  return (
    <ThemeProvider theme={theme}>
      <CategoryContext.Provider value={{category, setCategory}}>
      <ScoreContext.Provider
          value={{currentScore, setCurrentScore}}>
        <TopScoresContext.Provider 
          value={{topScores, setTopScores}}
          > 
          <div className="App">
          <HashRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/play" element={<Play />} /> 
                <Route path="/highscores" element={<HighScores />}/>
                <Route path="/score" element={<Score />}/>
            </Routes>
          </HashRouter>
          </div>
        </TopScoresContext.Provider>
        </ScoreContext.Provider>
      </CategoryContext.Provider>
    </ThemeProvider>
  );
}

export default App;