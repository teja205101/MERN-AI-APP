import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// Implementation detail
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'prompt is too long please try to keep under 1000 charcters.'),
   conversationId: z.string(),
   // .uuid(),
});

// Public interface
export const chatController = {
   async sendMessagge(req: Request, res: Response) {
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
   },
};
