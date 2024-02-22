import { env } from "@/env"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAfterAuthRedirectionLink(link: string) {
  return `${env.NEXT_PUBLIC_SIGN_IN_PAGE}?redirect_url=${encodeURIComponent(link)}`
}
