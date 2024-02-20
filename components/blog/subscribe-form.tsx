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
import { emailPostSchema } from "@/lib/validation";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { subscribe } from "@/server/actions";
import { Icons } from "../icons";
import { useToast } from "../ui/use-toast";

type Form = z.infer<typeof emailPostSchema>

export function SubscribeForm() {
  const { toast } = useToast()

  const form = useForm<Form>({
    resolver: zodResolver(emailPostSchema),
    defaultValues: {
      email: "",
    },
  })

  const { execute, status } = useAction(subscribe, {
    onSuccess: (data) => {
        if(data.success) {
          toast({
            description: "Your subscription has been registered.",
          })
        } else {
          toast({
            description: "Email already registered",
            variant: "destructive"
          })
        }
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

  function onSubmit(values: Form) {
    execute(values)
  }

  return (
    <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="w-full flex flex-col gap-4">
                <h2 className="p-0 text-sm">Our hand-crafted newsletter</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input 
                                    type="email" 
                                    placeholder="Your email"
                                    {...field} 
                                />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <Button disabled={isLoading}>
                        {isLoading && <Icons.loader className="mr-2 w-4 h-4" />}
                        Subscribe
                    </Button>
                </div>
            </div>
        </form>
    </Form>
  );
};