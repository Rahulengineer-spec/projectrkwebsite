"use client"

import { createContext, useState, useContext } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Session, SupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"

const supabase = createClientComponentClient<Database>()

interface SupabaseContext {
  supabase: SupabaseClient<Database>
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  // Mock session for testing
  const [session] = useState<Session | null>({
    user: {
      id: "test-user-id",
      email: "test@example.com",
      role: "admin",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    },
    access_token: "mock-access-token",
    refresh_token: "mock-refresh-token",
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  } as Session)

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}