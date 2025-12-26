import { IconType } from "react-icons"

// fa6
import {
  FaWallet,
  FaCreditCard,
} from "react-icons/fa6"

// io5
import {
  IoHome,
  IoDocumentText,
  IoSettingsSharp} from "react-icons/io5"

// md
import {
  MdSavings,
} from "react-icons/md"

const iconRegistry: Record<string, IconType> = {
  // io5
  IoHome,
  IoDocumentText,
  IoSettingsSharp,

  // fa6
  FaWallet,
  FaCreditCard,

  // md
  MdSavings,
}

export function resolveIcon(iconName?: string | null): IconType | null {
  if (!iconName) return null
  return iconRegistry[iconName] ?? null
}
