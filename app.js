import 'dotenv/config';
import express from 'express';
import { router as wordsRouter } from './routes/words_routes.js';
import { router as usersRouter } from './routes/users_routes.js';
import cookieParser from 'cookie-parser';
import { authController } from './controllers/auth_controller.js';

const app = express()
const port = 3000

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/words', wordsRouter);
app.use('/users', usersRouter);
app.post('/auth/login', authController.login);
app.get('/auth/refresh', authController.regenerateToken);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
