// import { supabase } from "./configuration"

// let notProtectedRoutes: string[] = []
// export async function LoadNotProtectedRoutes() {
//     const {data,error} = await supabase
//     .from("Users")
//     .select ("*")
//     .eq("access", false)
//     .eq("isactive", "active")
//     if(!error && data) {
//         notProtectedRoutes = data.map(d => d.route)
//     }
// } 

// export function getNotProtectedRoutes(): string[] {
//     return notProtectedRoutes;
// }

import { MenuItem } from '@/shared/types/menuitem'
import { supabase } from './configuration'

export async function getNotProtectedRoutes(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('master_menu')
    .select('*')
    .eq('access', false)
    .eq('isacitve', 'active')
    .order('urut', {ascending:true})
    console.log("📦 RAW RESULT:", { data, error })
    if (error || !data) return []

  return data
}
