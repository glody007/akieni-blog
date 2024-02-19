"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ClerkProvider } from '@clerk/nextjs'

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props)  {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 6 * 1000
                    }
                }
            })
    )

    return (
        <ClerkProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </ClerkProvider>
    )
}