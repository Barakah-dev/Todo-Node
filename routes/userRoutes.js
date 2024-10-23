const express = require("express");
const router = express.Router();
const { createUser, userLogin, getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/usersController");

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRequest:
 *       type: object
 *       required:
 *         - FirstName
 *         - LastName
 *         - Email
 *         - Phone
 *         - Password
 *       properties:
 *         ID:
 *           type: integer
 *           readOnly: true
 *         FirstName:
 *           type: string
 *           description: First name of the user
 *         LastName:
 *           type: string
 *           description: Last name of the user
 *         Email:
 *           type: string
 *           description: User email
 *         Phone:
 *           type: string
 *           description: User phone number
 *         Password:
 *           type: string
 *           description: User password
 * 
 *     UserResponse:
 *       type: object
 *       required:
 *         - ID
 *         - FirstName
 *         - LastName
 *         - Email
 *         - Phone
 *         - CreatedAt
 *         - LastModified
 *       properties:
 *         ID:
 *           type: integer
 *           readOnly: true
 *         FirstName:
 *           type: string
 *           description: First name of the user
 *         LastName:
 *           type: string
 *           description: Last name of the user
 *         Email:
 *           type: string
 *           description: User email
 *         Phone:
 *           type: string
 *           description: User phone number
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           description: Date of creation
 *           readOnly: true
 *         LastModified:
 *           type: string
 *           format: date-time
 *           description: Date of last modification
 *           readOnly: true
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       400:
 *         description: Missing fields
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", createUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 description: User email
 *               Password:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: User successfully logged in
 *       400:
 *         description: Password mismatch
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.post("/login", userLogin);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 description: First name of the user
 *               LastName:
 *                 type: string
 *                 description: Last name of the user
 *               Phone:
 *                 type: string
 *                 description: User phone number
 *     responses:
 *       200:
 *         description: User successfully updated
 *       400:
 *         description: Missing fields
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteUser);


module.exports = router;
