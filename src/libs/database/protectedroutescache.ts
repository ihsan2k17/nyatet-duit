// protectedroutescache.ts
import { supabase } from "./configuration"

let cachedRoutes: string[] | null = null

export async function getProtectedRoutes(): Promise<string[]> {
  if (cachedRoutes) {
    return cachedRoutes
  }

  const { data, error } = await supabase
    .from("master_menu")
    .select("route")
    .eq("access", true)
    .eq("isacitve", "active")

  if (error || !data) {
    cachedRoutes = []
    return cachedRoutes
  }

  cachedRoutes = data.map(d => d.route)

  console.log("🔥 getProtectedRoutes loaded ONCE:", cachedRoutes)

  return cachedRoutes
}
