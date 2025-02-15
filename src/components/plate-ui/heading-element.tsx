'use client'

import React from 'react'
import { withRef, withVariants } from '@udecode/cn'
import { cva } from 'class-variance-authority'

import { PlateElement } from './plate-element'

const headingVariants = cva('relative mb-1', {
  variants: {
    variant: {
      h1: 'pb-1 font-heading text-3xl font-bold',
      h2: 'pb-px font-heading text-xl font-semibold tracking-tight',
      h3: 'pb-px font-heading text-lg font-semibold tracking-tight',
      h4: 'font-heading text-base font-semibold tracking-tight'
    }
  }
})

const HeadingElementVariants = withVariants(PlateElement, headingVariants, [
  'variant'
])

export const HeadingElement = withRef<typeof HeadingElementVariants>(
  ({ children, variant = 'h1', ...props }, ref) => {
    return (
      <HeadingElementVariants
        ref={ref}
        as={variant!}
        variant={variant}
        {...props}
      >
        {children}
      </HeadingElementVariants>
    )
  }
)
