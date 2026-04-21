import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   //   res.send(`Api Key : ${process.env.API_KEY}`);
   res.send(
      'Hello Teja Congrats on new Ai Full Stack MERN AI Project Happy for you :)'
   );
});

app.post('/api/chat', async (req: Request, res: Response) => {});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
