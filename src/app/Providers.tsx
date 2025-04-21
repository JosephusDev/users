'use client' // Indica que este é um Client Component

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  // Cria uma instância do QueryClient no lado do cliente
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutos de cache
            retry: 2, // Número de tentativas em caso de erro
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <main className='dark text-foreground bg-background'>
          {children}
          <ToastProvider />
        </main>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}
