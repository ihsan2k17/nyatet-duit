// shared/ui/icon.tsx
import { resolveIcon } from '@/shared/utils/icon.registry'
import { createElement } from 'react'

interface Props {
  name?: string | null
  className?: string
}

export function RenderIcon({ name, className }: Props) {
  const Comp = resolveIcon(name)
  if (!Comp) return null
  return createElement(Comp, {className})
}
