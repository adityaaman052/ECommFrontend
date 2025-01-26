import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-gradient-to-r from-emerald-400 to-teal-500", // Gradient effect
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      "transition-all duration-300 ease-in-out", // Smooth transition for effects
      className
    )}
    {...props} />
))
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
