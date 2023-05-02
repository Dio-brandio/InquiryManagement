const mysql = require('mysql');
const util = require("util")
const con = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

const query = util.promisify(con.query).bind(con);

con.connect(function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected!");
  }
});

module.exports = query
