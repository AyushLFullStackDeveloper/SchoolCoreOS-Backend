const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Tech80922025",  
  port: 5433,                
});

module.exports = pool;
