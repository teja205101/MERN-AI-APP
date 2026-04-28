import { CircleArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';

type FormData = {
   prompt: string;
};

export const ChatBot = () => {
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = async ({ prompt }: FormData) => {
      reset();

      const { data } = await axios.post('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });

      console.log(data);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
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
   );
};
