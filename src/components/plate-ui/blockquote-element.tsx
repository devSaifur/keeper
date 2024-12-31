import { cn, withRef } from '@udecode/cn'

import { PlateElement } from './plate-element'

export const BlockquoteElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    return (
      <PlateElement
        ref={ref}
        as="blockquote"
        className={cn(className, 'my-1 border-l-2 pl-6 italic')}
        {...props}
      >
        {children}
      </PlateElement>
    )
  }
)