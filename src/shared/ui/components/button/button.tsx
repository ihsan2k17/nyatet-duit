import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/libs/utils"



const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 
  whitespace-nowrap rounded-md text-sm font-medium 
  transition-all disabled:pointer-events-none 
  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 
  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring 
  focus-visible:ring-ring/50 focus-visible:ring-[3px] 
  aria-invalid:ring-button-secondary/20 dark:aria-invalid:ring-button-secondary/40 
  aria-invalid:border-button-secondary`,
  {
    variants: {
      variant: {
        default: "bg-button-primary cursor-pointer text-text-invert hover:bg-primary/90",
        destructive:
          "bg-button-secondary cursor-pointer text-white hover:bg-button-secondary/90 focus-visible:ring-button-secondary/20 dark:focus-visible:ring-button-secondary/40 dark:bg-button-secondary/60",
        outline:
          "border bg-border cursor-pointer shadow-xs hover:bg-button-primary hover:text-text-primary dark:bg-white/30 dark:border-white dark:hover:bg-white/50",
        secondary:
          "bg-secondary cursor-pointer text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent cursor-pointer hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-text-primary cursor-pointer underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
