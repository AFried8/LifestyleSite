import React, { useReducer } from "react";

function scoreReducer(state, action) {
    switch (action.type) {
      case "Right":
        return { score: state.score + 3 };
      case "Wrong":
        return { score: state.score-2 };
    case "Zero":
        return {score: 0}
      default:
        throw new Error(`Count Reducer does not recognize ${action.type}`);
    }
  }

export const ScoreContext = React.createContext();

export const ScoreContextProvider = (props) => {
  const [score, dispatchScore] = useReducer(
    scoreReducer,0
  );
  return (
    <ScoreContext.Provider
      value={{ score, dispatchScore }}
    >
      {props.children}
    </ScoreContext.Provider>
  );
};