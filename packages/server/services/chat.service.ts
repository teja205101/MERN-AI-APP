import OpenAI from 'openai';
import { connverstaionRepository } from '../repositories/conversation.repository';

interface ChatResponse {
   Id: string;
   message: string;
}
// Implementation detail
const client = new OpenAI({
   apiKey: process.env.API_KEY,
});

// Public Interface
// Leaky abstraction
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await client.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.3,
         max_output_tokens: 100,
         previous_response_id:
            connverstaionRepository.getLastResponseId(conversationId),
      });

      connverstaionRepository.setLastResponseId(conversationId, response.id);

      return { Id: response.id, message: response.output_text };
   },
};
