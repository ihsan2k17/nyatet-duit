
import { MenuItem } from '@/module/master'
import { supabasePublic } from './publicconfiguration'


export async function getNotProtectedRoutes(): Promise<MenuItem[]> {
  const { data, error } = await supabasePublic
    .from('master_menu')
    .select('*')
    .eq('access', false)
    .eq('isacitve', 'active')
    .order('urut', {ascending:true})
    if (error || !data) return []

  return data
}
