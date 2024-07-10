import React, { Fragment, useState } from 'react';

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.description);

    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const bodyObj = { description };
            // by default, fetch makes a GET request, therefore some changes are needed
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: "PUT", // we will send data (the description) to the server
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
            <button
                type="button"
                class="btn btn-warning"
                data-toggle="modal"
                data-target={`#id${todo.todo_id}`}>
                Edit
            </button>

            <div
                class="modal"
                id={`id${todo.todo_id}`}
                onClick={() => setDescription(todo.description)} // reset description
            >
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Todo</h4>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)} // reset description
                            >
                                &times;
                            </button>
                        </div>

                        <div class="modal-body">
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-warning"
                                data-dismiss="modal"
                                onClick={(e) => updateDescription(e)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick={() => setDescription(todo.description)} // reset description
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditTodo;