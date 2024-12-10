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

    <div id="App" className = {theme} data-testid="App">
        <Sidebar></Sidebar>

        <div id = "login_container" data-testid = "login-form">
            <form>
                <label htmlFor="username">Username: </label>
                
                <input type="text" id="username" name="username" placeholder = "Username" data-testid = "username_field"></input>
                <br></br>
                <label htmlFor="password">Password: </label> 
                <input type="password" id="password" name="password" placeholder = "Password" data-testid = "password_field"></input>
                <br></br>
                <input id = "login_button" type="submit" value="Login"  data-testid = "login_submit_button"></input>
            
            </form>
        </div>

    </div>
    </>
    );
}