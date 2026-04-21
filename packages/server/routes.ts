import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   //   res.send(`Api Key : ${process.env.API_KEY}`);
   res.send(
      'Hello Teja Congrats on new Ai Full Stack MERN AI Project Hroutery for you :)'
   );
});

router.post('/api/chat', chatController.sendMessagge);

export default router;
