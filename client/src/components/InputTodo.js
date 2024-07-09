import React, { Fragment, useState } from 'react'

const InputTodo = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const bodyObj = { description };
            // by default, fetch makes a GET request, therefore some changes are needed
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST", // we will send data (the description) to the server
                headers: { "Content-Type": "application/json" }, // the data will be sent as JSON
                body: JSON.stringify(bodyObj) // when sending data to a web server, the data has to be a string 
            });
            console.log(response); // see response in browser's console
            window.location = "/"; // refresh the webpage 
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">PERN Todo List</h1>
            <form className="d-flex" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }} />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputTodo;