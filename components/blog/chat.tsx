'use client';

import { useChat } from 'ai/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';


interface ChatProps {
  articleId: string
}

// TO DO: Scroll on message 
// create component for message
export default function Chat({ articleId }: ChatProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const { messages, input, handleInputChange, handleSubmit } = useChat({ body: { articleId } });

  return (
    <div className='relative flex flex-col gap-4'>
      <div className={cn(
        'flex flex-col max-h-[400px] overflow-y-scroll',
      )}>
        {messages.map(m => (
          <div key={m.id} className={cn(
            "flex p-4 gap-2",
            {'bg-slate-300': m.role === 'assistant' }
          )}>
            <div className={cn(
              'w-8 h-8 p-2 flex justify-center items-center rounded bg-primary',
              {'bg-slate-300': m.role === 'user'}
            )}>
              <span className='text-white uppercase'>
                {m.role === 'assistant' ? 'ai' : 'me'}
              </span>
            </div>
            <div>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form 
        ref={formRef}
        className="" 
        onSubmit={handleSubmit}
      >
        <Textarea
          value={input}
          placeholder="Chat with the akienist..."
          onChange={handleInputChange}
          onKeyDown={(e: any) => {
            if(e.key === 'Enter') {
              if(input !== '') formRef.current?.requestSubmit()
              else e.preventDefault()
            }
          }}
          className="w-full"
        />
      </form>
    </div>
  );
}