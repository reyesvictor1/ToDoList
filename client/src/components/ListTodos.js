import React, { Fragment, useEffect, useState } from "react";

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
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListTodos;