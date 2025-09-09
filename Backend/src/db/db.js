import { Pool } from 'pg';


console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PORT:", process.env.PORT);
console.log("HOST:", process.env.HOST);

const pool = new Pool({
  user:  'root',//process.env.DB_USER,
  host: 'localhost', // process.env.HOST,
  database: 'IpoWeb', //process.env.DB_NAME,
  password: '$hubham@12',  //String(process.env.DB_PASSWORD),
  port: 5432 //Number(process.env.PORT),
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export { connectDb, pool };
