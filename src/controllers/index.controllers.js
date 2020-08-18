const { Pool } = require("pg");
const { response } = require("express");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password***",
  database: "firtapi",
  port: "5432",
});

const getUsers = async (req, res) => {
  const response = await pool.query("SELECT * FROM users");
  res.stattus(200).json(response.rows);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  res.json(response.rows);
};

const createUser = async (req, res) => {
  const { name, email } = req.body;

  const response = await pool.query(
    "INSERT INTO users (name, email VALUES ($1, $2)",
    [name, email]
  );
  console.log(response);
  res.json({
    message: "User addrd succesfully",
    body: {
      user: { name, email },
    },
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const response = await pool.query(
    "UPDATE users SET name = $1, email =$2 WHERE id = $3"[(name, email, id)]
  );
  console.log(response);
  res.send("User Updated succesfully");
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const responde = await pool.query("DELETE FROM users WHERE id = $1", []);
  console.log(response);
  res.json(`User ${id} deleted succesfully`);
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
