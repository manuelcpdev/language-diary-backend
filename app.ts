import 'dotenv/config';
import express from 'express';
import { router as wordsRouter } from './routes/words_routes.js';
import { router as usersRouter } from './routes/users_routes.js';
import cookieParser from 'cookie-parser';
import { authController } from './controllers/auth_controller.js';
import cors from 'cors';

const app = express()
const port = 3000
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('This site is not allowed by CORS'))
    }
  },
  credentials: true
}))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/words', wordsRouter);
app.use('/users', usersRouter);
app.post('/auth/login', authController.login);
app.get('/auth/refresh', authController.regenerateToken);

app.listen(port, () => {
  console.log(`Language diary listening on port ${port}`)
})
