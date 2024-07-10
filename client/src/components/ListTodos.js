import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {

    const [todos, setTodos] = useState([]);
    const getTodos = async () => {
        try {
            // by default, fetch makes a GET request, so we can keep it as:
            const response = await fetch("http://localhost:5000/todos"); // response takes some time, so use await
            const jsonData = await response.json(); // response takes some time, so use await
            console.log(jsonData);
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteTodo = async (todoId) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${todoId}`, {
                method: "DELETE"
            });
            console.log(response); // see response in browser's console
            // window.location = "/"; // refresh the webpage
            setTodos(todos.filter((todo) => todo.todo_id !== todoId)); // better approach, instead of refreshing the webpage every time
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getTodos();
    }, []); // performs a function every time the compnent is rendered

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {todos.map((todo) => (
                        <tr key={todo.todo_id}>
                            <td>{todo.description}</td>
                            <td>
                                <EditTodo todo={todo} />
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteTodo(todo.todo_id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;