import React, {useReducer} from 'react';
import {CategoryReducer} from './categoryReducer';

export const CategoryContext = React.createContext({category: 'noSelection'});

export const CategoryProvider = () => {

    const [currentCat, catDispatch] = useReducer(CategoryReducer, {category: 'noSelection'});

    return (
        <CategoryContext.Provider
            value = {{
                currentCat,
                catDispatch
            }}
        />
    )
    
}