"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { articlePostCommentSchema } from "@/lib/validation";
import { z } from "zod";
import { Button } from "../ui/button";
import { postComment, } from "@/server/actions";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";
import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "@clerk/nextjs";
import { generateAfterAuthRedirectionLink } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Form = z.infer<typeof articlePostCommentSchema>

interface Props {
  articleId: string
}

export function AddCommentForm({ articleId }: Props) {
  const { toast } = useToast()

  const form = useForm<Form>({
    resolver: zodResolver(articlePostCommentSchema),
    defaultValues: {
      articleId,
      body: "",
    },
  })

  const { execute, status } = useAction(postComment, {
    onSuccess: () => {
        toast({
            description: "Your comment has been posted.",
        })
        form.reset()
    },
    onError: () => {
        toast({
            description: "Something went wrong.",
            variant: "destructive"
        })
    }
  })

  const isLoading = status === "executing"
  const isValid = form.watch("body").length > 0

  function onSubmit(values: Form) {
    execute(values)
  }

  return (
    <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
              <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                  <FormItem>
                      <FormControl>
                        <TextareaAutosize
                          autoFocus
                          id="title"
                          placeholder="What are your thoughts?"
                          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-sm font-light focus:outline-none"
                          {...field} 
                        />
                      </FormControl>
                  </FormItem>
                  )}
              />
              <Button 
                size="sm" 
                className="ml-auto" 
                disabled={!isValid || isLoading}
              >
                  {isLoading && <Icons.loader className="mr-2 w-4 h-4" />}
                  Respond
              </Button>
            </div>
        </form>
    </Form>
  );
};

export function AddCommentFormButton({ articleId }: Props) {
  const router = useRouter()

  const signIn = () => {
    const authLink = generateAfterAuthRedirectionLink(window.location.href)
    router.push(authLink)
  }

  return (
    <button 
      className="text-start border p-4 shadow-lg"
      onClick={signIn}
    >
      <p className="text-sm font-light">
        What are your thoughts?
      </p>
    </button>
  )
}

export function AddCommentFormWithLogin({ articleId }: Props) {
  const { isSignedIn } = useAuth()

  return (
    <>
      {isSignedIn ? (
        <div className="border p-4 shadow-lg">
          <AddCommentForm articleId={articleId} />
        </div>
      ) : (
        <AddCommentFormButton articleId={articleId} />
      )}
    </>
  )
}