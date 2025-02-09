'use client'

import React from 'react'
import { cn, useComposedRef, withRef } from '@udecode/cn'
import { BlockSelectionPlugin } from '@udecode/plate-selection/react'
import {
  PlateElement,
  usePluginOption,
  useReadOnly,
  useSelected
} from '@udecode/plate/react'

export const TableRowElement = withRef<typeof PlateElement>(
  ({ children, className, ...props }, ref) => {
    const readOnly = useReadOnly()
    const selected = useSelected()
    const isSelectionAreaVisible = usePluginOption(
      BlockSelectionPlugin,
      'isSelectionAreaVisible'
    )
    const hasControls = !readOnly && !isSelectionAreaVisible

    return (
      <PlateElement
        ref={useComposedRef(ref)}
        as="tr"
        className={cn(className, 'group/row')}
        data-selected={selected ? 'true' : undefined}
        {...props}
      >
        {hasControls && (
          <td className="w-2 select-none" contentEditable={false}>
            <DropLine />
          </td>
        )}

        {children}
      </PlateElement>
    )
  }
)

function DropLine() {
  return (
    <div className={cn('absolute inset-x-0 left-2 z-50 h-0.5 bg-brand/50')} />
  )
}
