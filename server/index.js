const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
//middleware
app.use(cors());
app.use(express.json());
app.listen(5000, () => {
    console.log("server runing on port 5000");
});

//ROUTES

//create a todo
app.post("/todos", async(req, res) =>{
    try {
        const {description} =  req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",[description]);
            res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//get all todos
app.get("/todos", async(req, res) =>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})
//get a todo
app.get("/todos/:id", async( req, res) =>{
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});
//update a todo
app.put("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params; // lấy gtri id từ tham số URL
        const {description} = req.body; // lấy gtri mới từ body của yêu cầu
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
        res.json("Todo update success");
    } catch (err) {
        console.error(err.message);
    }
});
//delete a todo
app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json("Delete success");
    } catch (err) {
        console.log(err.message);
    }
});

// API để cập nhật trạng thái hoàn thành của nhiệm vụ
app.put("/todos/finish/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateTodo = await pool.query(
        "UPDATE todo SET status = 'complete' WHERE todo_id = $1",
        [id]
      );
      res.json("Todo marked as complete");
      console.log(updateTodo);
    } catch (err) {
      console.error(err.message);
    }
  });
  