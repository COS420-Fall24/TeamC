import React, {createContext, useState} from 'react';

const FocusModeContext = createContext();

function FocusProvider(props){
    const [isFocusMode, setFocusMode] = useState(false);

    const toggleFocusMode = () => {
        setFocusMode(!isFocusMode);
    };

    return (
        <div>  
            <FocusModeContext.Provider value={{isFocusMode, toggleFocusMode}}>
                {props.children}
            </FocusModeContext.Provider>
        </div>
    )
};

export {FocusModeContext, FocusProvider};