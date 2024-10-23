const pool = require('../config/dbConfig');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Phone, Password } = req.body;
    if (!FirstName || !LastName || !Email || !Phone || !Password) {
      return res.status(400).json({message: "Please fill all fields"});
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const phoneRegex = /^\+44\d{10}$/;
    if (!phoneRegex.test(Phone)) {
      return res.status(400).json({ message: "Invalid phone number format. Expected format: +44XXXXXXXXXX" });
    }

    if (Password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(Password)) {
      return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character" });
    }

    const existingUser = await pool.query(`SELECT * FROM "Users" WHERE "Email" = $1`, [Email]);
    if (existingUser.rowCount > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const HashedPassword = await bcrypt.hash(Password, saltRounds);

    const createUserQuery = 
      `INSERT INTO "Users" 
        ("FirstName", "LastName", "Email", "Phone", "HashedPassword", "CreatedAt", "LastModified") 
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *`
        
    const newUser =  await pool.query(createUserQuery, [FirstName, LastName, Email, Phone, HashedPassword]);

    const { HashedPassword: _, ...userWithoutPassword } = newUser.rows[0];
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const {Email, Password: enteredPassword} = req.body;

    if (!Email || !enteredPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    // const user = await pool.query(
    //   `SELECT "ID", "FirstName", "LastName", "Email", "Phone", "CreatedAt", "LastModified" FROM "Users" WHERE "Email" = $1`, [Email]
    // );
    const { rows: [user] } = await pool.query(`SELECT * FROM "Users" WHERE "Email" = $1`, [Email]);
    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }
    const isPasswordValid = await bcrypt.compare(enteredPassword, user.HashedPassword);
    if (isPasswordValid) {
      res.status(200).json({ message: "User logged in successfully" });
    } else  {
      return res.status(400).json({ message: "Password mismatch" });
  }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await pool.query(
      `SELECT "ID", "FirstName", "LastName", "Email", "Phone", "CreatedAt", "LastModified" FROM "Users"`
    );
    res.status(200).json(allUsers.rows)
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await pool.query(
      `SELECT "ID", "FirstName", "LastName", "Email", "Phone", "CreatedAt", "LastModified" FROM "Users" WHERE "ID" = $1`, [id]
    );
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.rows[0])
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const {FirstName, LastName, Phone} = req.body;
    if (!FirstName || !LastName || !Phone) {
      res.status(400).json({message: "Please fill all fields"});
    }

    const updateQuery =
    `UPDATE "Users" SET
      "FirstName" = $1, 
      "LastName" = $2,
      "Phone" = $3,
      "LastModified" = CURRENT_TIMESTAMP
    WHERE "ID" = $4
    RETURNING *`

    const user = await pool.query(updateQuery, [FirstName, LastName, Phone, id])
    if (user.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const { HashedPassword: _, ...userWithoutPassword } = user.rows[0];
    res.status(200).json({
      message: "user successfully updated",
      data: userWithoutPassword
    })
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteUser = async (req, res) => {
  try {
   const id = req.params.id;
   const deleteUser = await pool.query(`DELETE FROM "Users" WHERE "ID" = $1`, [id])
 
   if (deleteUser.rowCount === 0) {
     return res.status(404).json({ message: "User not found" });
   }
 
   res.status(200).json({
     message: "User successfully deleted",
   })
  } catch (error) {
   console.error(error.message);
   res.status(500).json({ message: "Internal server error" });
  }
 }

module.exports = { createUser, userLogin, getAllUsers, getUser, updateUser, deleteUser };