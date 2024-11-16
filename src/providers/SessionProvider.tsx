"use client"

import { Session } from 'next-auth'
import React, { FC, ReactNode } from 'react'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

interface IsessionProviderProps {
    children: ReactNode
    session: Session | null;
}

const SessionProvider: FC<IsessionProviderProps> = ({children, session}) => {
  return (
    <NextAuthProvider session={session}>{children}</NextAuthProvider>
  )
} 

export default SessionProvider