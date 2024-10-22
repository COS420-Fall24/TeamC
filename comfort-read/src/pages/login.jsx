import logo from './../logo.svg';
import './../App.css';

import React from "react";
import {Link} from "react-router-dom";
import Sidebar from '../Components/Sidebar';

export function Login(){
    return (
        <>

    <div className="App">
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