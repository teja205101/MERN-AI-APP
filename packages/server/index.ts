import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

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

let lastResponseId: string | null = null;
const conversations = new Map<string, string>();

app.post('/api/chat', async (req: Request, res: Response) => {
   const { prompt, conversationId } = req.body;

   const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.3,
      max_output_tokens: 100,
      previous_response_id: conversations.get(conversationId),
   });

   conversations.set(conversationId, response.id);

   res.json({ message: response.output_text });
});

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
