import React from "react";
import {useState} from "react";


export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [category, setCategory] = useState('');

    return (
        <CategoryContext.Provider
        value = {{
            category, setCategory
        }}
        >
        </CategoryContext.Provider>
    );
};