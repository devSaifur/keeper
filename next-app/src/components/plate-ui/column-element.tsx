'use client'

import React from 'react'
import { cn, useComposedRef, withRef } from '@udecode/cn'
import type { TColumnElement } from '@udecode/plate-layout'
import { ResizableProvider } from '@udecode/plate-resizable'
import { BlockSelectionPlugin } from '@udecode/plate-selection/react'
import { usePluginOption, useReadOnly, withHOC } from '@udecode/plate/react'
import { GripHorizontal } from 'lucide-react'

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
    const { width } = props.element as TColumnElement
    const readOnly = useReadOnly()
    const isSelectionAreaVisible = usePluginOption(
      BlockSelectionPlugin,
      'isSelectionAreaVisible'
    )

    return (
      <div className="group/column relative" style={{ width: width ?? '100%' }}>
        {!readOnly && !isSelectionAreaVisible && (
          <div
            className={cn(
              'absolute left-1/2 top-2 z-50 -translate-x-1/2 -translate-y-1/2',
              'pointer-events-auto flex items-center',
              'opacity-0 transition-opacity group-hover/column:opacity-100'
            )}
          >
            <ColumnDragHandle />
          </div>
        )}

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

            {!readOnly && !isSelectionAreaVisible && <DropLine />}
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
ColumnDragHandle.displayName = 'ColumnDragHandle'

const DropLine = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn('slate-dropLine', 'absolute bg-brand/50', className)}
    />
  )
}
