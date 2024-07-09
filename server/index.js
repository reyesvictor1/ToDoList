const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); // by using the pool we can run queries with postgres

// middleware
app.use(cors());
// when building a full stack app, we need to get data from the client side
// the only way to get data from the client side is from the request.body object
app.use(express.json()); // this line gives us access to the request.body as json data


// ==================== ROUTES ====================

// create a TODO
app.post("/todos", async (request, response) => {
    try {
        console.log(request.body);
        const { description } = request.body; // deconstruct request.body
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        response.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
});

// get all TODOs
app.get("/todos", async (request, response) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        response.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
});

// get a TODO
app.get("/todos/:id", async (request, response) => { // :id allows URL to be dynamic
    try {
        console.log(request.params);
        const { id } = request.params; // deconstruct request.params
        const todo = await pool.query(
            "SELECT * FROM todo WHERE todo_id=$1",
            [id]
        );
        response.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a TODO
app.put("/todos/:id", async (request, response) => {
    try {
        console.log(request.params); // requested id to be updated
        console.log(request.body); // data body received by the client
        const { id } = request.params;
        const { description } = request.body;
        const updatedTodo = await pool.query(
            "UPDATE todo SET description=$1 WHERE todo_id=$2 RETURNING *",
            [description, id]
        );
        response.json(updatedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// delete a TODO
app.delete("/todos/:id", async (request, response) => {
    try {
        console.log(request.params); //requested id to be deleted
        const { id } = request.params;
        const deletedTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id=$1 RETURNING *",
            [id]
        );
        response.json(deletedTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// =================================================

// server will be listening to port 5000 for client requests
app.listen(5000, () => {
    console.log("port has started on port 5000");
});