import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    CLERK_SECRET_KEY: z.string().min(1),
    OPENAI_API_KEY: z.string().min(1),
    COURIER_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
    NEXT_PUBLIC_SIGN_IN_PAGE: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_SIGN_IN_PAGE: process.env.NEXT_PUBLIC_SIGN_IN_PAGE,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    COURIER_API_KEY: process.env.COURIER_API_KEY,
  },
});