import { cn } from '@udecode/cn'
import type { SlateLeafProps } from '@udecode/plate-common'
import { SlateLeaf } from '@udecode/plate-common'

export function CodeSyntaxLeafStatic({
  children,
  className,
  ...props
}: SlateLeafProps) {
  const syntaxClassName = `prism-token token ${props.leaf.tokenType}`

  return (
    <SlateLeaf className={cn(className, syntaxClassName)} {...props}>
      {children}
    </SlateLeaf>
  )
}
