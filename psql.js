import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',      
  host: 'localhost',     
  database: 'names',     
  password: 'mta1906', 
  port: 5432,            
});


pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((error) => console.error("Connection error:", error));

export default pool;
