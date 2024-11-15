import React, {createContext, useState} from 'react';

const DarkModeContext = createContext();

function DarkModeProvider(props){
    const [theme, setDarkMode] = useState("light");

    const toggleDarkMode = (dark) => {
        if(theme === "dark"){
            setDarkMode("light");
        }else{
            setDarkMode("dark");
        }
    };

    return (
        <div>  
            <DarkModeContext.Provider value={{theme, toggleDarkMode}}>
                {props.children}
            </DarkModeContext.Provider>
        </div>
    )
};

export {DarkModeContext, DarkModeProvider};