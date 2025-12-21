import { supabase } from "./configuration"

export async function getProtectedRoutes(): Promise<string[]> {
    const { data, error } = await supabase
        .from("master_menu") // <-- pakai underscore, bukan dash
        .select("route")
        .eq("access", true)
        .eq("isacitve", "active")

    console.log("getProtectedRoutes -> data:", data)
    console.log("getProtectedRoutes -> error:", error)

    if(error || !data) return []

    const routes = data.map(d => d.route)
    console.log("getProtectedRoutes -> routes mapped:", routes)

    return routes
}
