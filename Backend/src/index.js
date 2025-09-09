import dotenv from 'dotenv';
import app from "./app.js";
import {connectDb} from "./db/db.js";

dotenv.config({
  path: './.env',
  message: 'Environment variables loaded successfully',
});


connectDb()
.then(()=> {
  app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('app is listening');
  });
    console.log('✅ Database connection established');
})
.catch((error) => {
    console.error('Database connection failed:', error);
});

