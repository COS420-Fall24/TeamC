import './../App.css';

import React from "react";
import {Link} from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import { DarkModeContext } from '../Context/DarkModeContext';
import { useContext } from 'react';

export function Login(){
    const {theme} = useContext(DarkModeContext);

    return (
        
        <>

    <div id="App" class = {theme}>
        <Sidebar></Sidebar>

        <div id = "login_container">
            <form>
                <label for="username">Username: </label>
                
                <input type="text" id="username" name="username" placeholder = "Username"></input>
                <br></br>
                <label for="password">Password: </label> 
                <input type="password" id="password" name="password" placeholder = "Password"></input>
                <br></br>
                <input id = "login_button" type="submit" value="Login"></input>
            
            </form>
        </div>

    </div>
    </>
    );
}