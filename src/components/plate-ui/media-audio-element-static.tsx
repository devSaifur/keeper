import { cn } from '@udecode/cn'
import type { SlateElementProps } from '@udecode/plate-common'
import { SlateElement } from '@udecode/plate-common'
import type { TAudioElement } from '@udecode/plate-media'

export function MediaAudioElementStatic({
  children,
  className,
  ...props
}: SlateElementProps) {
  const { url } = props.element as TAudioElement

  return (
    <SlateElement className={cn(className, 'mb-1')} {...props}>
      <figure className="group relative cursor-default">
        <div className="h-16">
          <audio className="size-full" src={url} controls />
        </div>
      </figure>
      {children}
    </SlateElement>
  )
}