const pool = require('../config/dbConfig');

const createTodo = async (req, res) => {
  try {
    const { Title, Description } = req.body;
    if (!Title || !Description) {
      return res.status(400).json({message: "Please fill both Title and Description fields"});
    }
    const createTodoQuery = 
      `INSERT INTO "Todos" 
        ("Title", "Description", "CreatedAt", "LastModified") 
        VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *`

    const newTodo =  await pool.query(createTodoQuery, [Title, Description]);
    res.status(200).json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
const getAllTodos = async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT * FROM "Todos"`);
    res.status(200).json(allTodos.rows)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getTodo = async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query(`SELECT * FROM "Todos" WHERE "ID" = $1`, [id]);
    if (todo.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(todo.rows[0])
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
const updateTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const {Title, Description} = req.body;
    if (!Title || !Description) {
      return res.status(400).json({message: "Please fill both Title and Description fields"});
    }

    const updateQuery =
    `UPDATE "Todos" SET
      "Title" = $1, 
      "Description" = $2,
      "LastModified" = CURRENT_TIMESTAMP
    WHERE "ID" = $3
    RETURNING *`

    const todo = await pool.query(updateQuery, [Title, Description, id])
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Todo successfully updated",
      data: todo.rows[0]
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteTodo = async (req, res) => {
  try {
   const id = req.params.id;
   const deleteTodo = await pool.query(`DELETE FROM "Todos" WHERE "ID" = $1`, [id])
 
   if (deleteTodo.rowCount === 0) {
     return res.status(404).json({ message: "Todo not found" });
   }
 
   res.status(200).json({
     message: "Todo successfully deleted",
   })
  } catch (error) {
   console.error(error.message);
   res.status(500).json({ message: "Internal server error" });
  }
 }

module.exports = { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo }