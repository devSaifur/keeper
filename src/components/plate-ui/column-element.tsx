import React from 'react'
import { cn, useComposedRef, withRef } from '@udecode/cn'
import { useElement, withHOC } from '@udecode/plate-common/react'
import type { TColumnElement } from '@udecode/plate-layout'
import { ResizableProvider } from '@udecode/plate-resizable'
import { GripHorizontal } from 'lucide-react'
import { useReadOnly } from 'slate-react'

import { Button } from './button'
import { PlateElement } from './plate-element'
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger
} from './tooltip'

export const ColumnElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(({ children, className, ...props }, ref) => {
    const readOnly = useReadOnly()
    const { width } = useElement<TColumnElement>()

    return (
      <div className="group/column relative" style={{ width: width ?? '100%' }}>
        <div
          className={cn(
            'absolute left-1/2 top-2 z-50 -translate-x-1/2 -translate-y-1/2',
            'pointer-events-auto flex items-center',
            'opacity-0 transition-opacity group-hover/column:opacity-100'
          )}
        >
          <ColumnDragHandle />
        </div>

        <PlateElement
          ref={useComposedRef(ref)}
          className={cn(
            className,
            'h-full px-2 pt-2 group-first/column:pl-0 group-last/column:pr-0'
          )}
          {...props}
        >
          <div
            className={cn(
              'relative h-full border border-transparent p-1.5',
              !readOnly && 'rounded-lg border-dashed border-border'
            )}
          >
            {children}
            <DropLine />
          </div>
        </PlateElement>
      </div>
    )
  })
)

const ColumnDragHandle = React.memo(() => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="none" variant="ghost" className="h-5 px-1">
            <GripHorizontal
              className="size-4 text-muted-foreground"
              onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
              }}
            />
          </Button>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent>Drag to move column</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
})

const DropLine = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(
        'slate-dropLine',
        'group-first/column:-left- absolute inset-y-0 left-[-10.5px] w-1 bg-brand/50',

        className
      )}
    />
  )
})
