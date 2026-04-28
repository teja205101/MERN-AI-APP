import { CircleArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

type FormData = {
   prompt: string;
};

interface ChatResponse {
   message: string;
}

export const ChatBot = () => {
   const [messages, setMessages] = useState<string[]>([]);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, prompt]);
      console.log('messages 1st-->', messages);

      reset();

      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });

      console.log('messages 2nd-->', messages);
      setMessages((prev) => [...prev, data.message]);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div>
         <div>
            {messages.map((message, index) => (
               <p key={index}>{message}</p>
            ))}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               className="w-full border focus:outline-0 resize-none"
               placeholder="Let's chat"
            />
            <button
               disabled={!formState.isValid}
               className="border-2 rounded-full"
            >
               <CircleArrowRight />
            </button>
         </form>
      </div>
   );
};
