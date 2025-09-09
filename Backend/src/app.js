import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.get('/', (req, res) => {
    console.log('Request received:', req.url);
    res.send('Hello, World!');
});

import userRouter from './Router/user.routes.js'


app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`⚙️  Server running at: http://localhost:${PORT}`);
});

export default app;





// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();

// // 👇 Needed to get __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // 👇 Serve static files from React's build output
// app.use(express.static(path.join(__dirname, '../UserSide/dist')));


// app.get((req, res) =>{
//     console.log('Request received:', req.url);
//     res.sendFile(path.join(__dirname, '../UserSide/dist/index.html'));
// })

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at: http://localhost:${PORT}`);
// });