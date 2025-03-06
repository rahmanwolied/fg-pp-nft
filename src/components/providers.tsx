'use client'

import { ReactNode, useEffect, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/reactQuery'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemeProvider>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="bg-background text-foreground h-screen w-screen" />

  return (
    <NextThemeProvider {...props} attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemeProvider>
  )
}