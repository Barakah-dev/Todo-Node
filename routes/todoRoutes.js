const express = require("express");
const router = express.Router();
const { createTodo, getAllTodos, getTodo, updateTodo, deleteTodo } = require("../controllers/todosController");


/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - Title
 *         - Description
 *       properties:
 *         ID:
 *           type: integer
 *           description: Unique identifier of the Todo
 *         Title:
 *           type: string
 *           description: Title of the Todo item *
 *         Description:
 *           type: string
 *           description: Description of the Todo item *
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the Todo was created
 *         LastModified:
 *           type: string
 *           format: date-time
 *           description: Date and time when the Todo was last modified
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new Todo
 *     description: Creates a new todo entry in the database.
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Bad request, missing fields or validation failed
 *       '500':
 *         description: Internal server error
 */
router.post('/', createTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all Todos
 *     description: Retrieves all todo entries from the database.
 *     tags:
 *       - Todos
 *     responses:
 *       '200':
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       '500':
 *         description: Internal server error
 */
router.get('/', getAllTodos);

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a specific Todo by ID
 *     description: Retrieves a specific todo entry from the database using its ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Todo to retrieve *
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Todo retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '404':
 *         description: Todo not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', getTodo);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a specific Todo by ID
 *     description: Updates a todo entry using its ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Todo to update *
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       '400':
 *         description: Bad request, missing fields or validation failed
 *       '404':
 *         description: Todo not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', updateTodo);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a Todo by ID
 *     description: Deletes a specific todo from the database by its ID.
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the Todo to delete *
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Todo successfully deleted
 *       '404':
 *         description: Todo not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', deleteTodo);

module.exports = router;
