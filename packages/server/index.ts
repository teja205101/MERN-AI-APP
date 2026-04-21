import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

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

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'prompt is too long please try to keep under 1000 charcters.'),
   conversationId: z.string(),
   // .uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);

   if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
   }

   try {
      const { prompt, conversationId } = req.body;

      const response = await chatService.sendMessage(prompt, conversationId);

      res.json({ message: response.message });
   } catch (error) {
      res.status(500).json({
         error: `Failed to generate a response bcz of ${error}`,
      });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
