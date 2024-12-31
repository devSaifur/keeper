import { cn } from '@udecode/cn'
import type { SlateElementProps } from '@udecode/plate-common'
import { SlateElement } from '@udecode/plate-common'

export function TableRowElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  return (
    <SlateElement as="tr" className={cn(className, 'h-full')} {...props}>
      {children}
    </SlateElement>
  )
}
