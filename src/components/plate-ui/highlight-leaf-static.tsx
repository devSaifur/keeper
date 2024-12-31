import { cn } from '@udecode/cn'
import type { SlateLeafProps } from '@udecode/plate-common'
import { SlateLeaf } from '@udecode/plate-common'

export function HighlightLeafStatic({
  children,
  className,
  ...props
}: SlateLeafProps) {
  return (
    <SlateLeaf
      as="mark"
      className={cn(className, 'bg-highlight/30 text-inherit')}
      {...props}
    >
      {children}
    </SlateLeaf>
  )
}
