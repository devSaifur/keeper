import { cn } from '@udecode/cn'
import type { SlateElementProps } from '@udecode/plate-common'
import { SlateElement } from '@udecode/plate-common'
import type { TColumnElement } from '@udecode/plate-layout'

export function ColumnElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  const { width } = props.element as TColumnElement

  return (
    <div className="group/column relative" style={{ width: width ?? '100%' }}>
      <SlateElement
        className={cn(
          className,
          'h-full px-2 pt-2 group-first/column:pl-0 group-last/column:pr-0'
        )}
        {...props}
      >
        <div className={cn('relative h-full border border-transparent p-1.5')}>
          {children}
        </div>
      </SlateElement>
    </div>
  )
}