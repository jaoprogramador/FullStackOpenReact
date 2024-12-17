import express from 'express';
import cors from 'cors';
import diaryRouter from './routes/diaries';
const app = express();
// Habilitar CORS para todas las rutas
app.use(cors({
  origin: 'http://localhost:5173',  // Solo permite solicitudes desde este origen
}));
// Esto habilitará el CORS para todas las solicitudes de cualquier origen.

app.use(express.json());

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});