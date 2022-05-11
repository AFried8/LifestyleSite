import './App.css';
import React, {useState, useContext} from "react";
import {Header} from '../header/Header';
import {Home} from '../home/Home';
import {Play} from '../play/Play';
import {Score} from '../score/Score';
import {HighScores} from '../highscores/HighScores';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Theme} from '../../state/theme';
import {ThemeProvider, createTheme } from '@mui/material/styles';

const theme = Theme;


function App() {

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/play" element={<Play />} /> 
            <Route path="/highscores" element={<HighScores />}/>
            <Route path="/score" element={<Score />}/>
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  );
}

export default App;
