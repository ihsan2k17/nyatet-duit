import { supabase } from "./configuration"

let protectedRoutes: string[] =[]
export async function LoadProtectedRoutes() {
    const {data, error} = await supabase
        .from("master-menu")
        .select("*")
        .eq("access",true)
        .eq("isactive","active")
    if(!error && data) {
        protectedRoutes = data.map(d => d.route)
    }
} 
export function getProtectedRoutes():string [] {
    return protectedRoutes
}