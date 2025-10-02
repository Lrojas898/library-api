import express from 'express';
import { userRouter } from './routes/user.routes';
import { bookRouter } from './routes/books.routes';
import './src/db/connectionDb';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use('/users', userRouter);
app.use('/books', bookRouter);
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});