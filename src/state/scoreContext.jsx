import React from "react";
import {useState} from "react";


export const ScoreContext = React.createContext();

export const ScoreProvider = (props) => {
    const [score, setScore] = useState(0);

    return (
        <ScoreContext.Provider
        value = {{
            score, setScore
        }}
        >
        </ScoreContext.Provider>
    );
};