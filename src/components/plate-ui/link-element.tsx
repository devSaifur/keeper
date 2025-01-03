import { cn, withRef } from '@udecode/cn'
import { useElement } from '@udecode/plate-common/react'
import type { TLinkElement } from '@udecode/plate-link'
import { useLink } from '@udecode/plate-link/react'

import { PlateElement } from './plate-element'

export const LinkElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const element = useElement<TLinkElement>()
    const { props: linkProps } = useLink({ element })

    return (
      <PlateElement
        ref={ref}
        as="a"
        className={cn(
          className,
          'font-medium text-primary underline decoration-primary underline-offset-4'
        )}
        {...(linkProps as unknown as Record<string, unknown>)}
        {...props}
      >
        {children}
      </PlateElement>
    )
  }
)
