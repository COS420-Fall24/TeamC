import React from "react";
import "../App.css";
import {Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


function UserInput() {
    return (
        <Form className = "UserInput">
            <FormGroup className="mb-3" controlId="userInputForm.ControlTextarea">
                <FormLabel>Input your text in the box below</FormLabel>
                <FormControl as="textarea" rows={8} size="lg"/>
            </FormGroup>
        </Form>
    )
}

export default UserInput;