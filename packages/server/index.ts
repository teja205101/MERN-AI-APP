import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';
import {
   getLastResponseId,
   setLastResponseId,
} from './repositories/conversation.repository';

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const client = new OpenAI({
   apiKey: process.env.API_KEY,
});

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

      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.3,
         max_output_tokens: 100,
         previous_response_id: getLastResponseId(conversationId),
      });

      setLastResponseId(conversationId, response.id);
      res.json({ message: response.output_text });
   } catch (error) {
      res.status(500).json({
         error: `Failed to generate a response bcz of ${error}`,
      });
   }
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
