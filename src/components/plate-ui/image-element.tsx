import { cn, withRef } from '@udecode/cn'
import { Image, ImagePlugin, useMediaState } from '@udecode/plate-media/react'
import { ResizableProvider, useResizableValue } from '@udecode/plate-resizable'
import { withHOC } from '@udecode/plate/react'

import { Caption, CaptionTextarea } from './caption'
import { MediaPopover } from './media-popover'
import { PlateElement } from './plate-element'
import { mediaResizeHandleVariants, Resizable, ResizeHandle } from './resizable'

export const ImageElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ children, className, nodeProps, ...props }, ref) => {
      const { align = 'center', focused, readOnly, selected } = useMediaState()

      const width = useResizableValue('width')

      return (
        <MediaPopover plugin={ImagePlugin}>
          <PlateElement
            ref={ref}
            className={cn(className, 'py-2.5')}
            {...props}
          >
            <figure className="group relative m-0" contentEditable={false}>
              <Resizable
                align={align}
                options={{
                  align,
                  readOnly
                }}
              >
                <ResizeHandle
                  className={mediaResizeHandleVariants({ direction: 'left' })}
                  options={{ direction: 'left' }}
                />
                <Image
                  className={cn(
                    'block w-full max-w-full cursor-pointer object-cover px-0',
                    'rounded-sm',
                    focused && selected && 'ring-2 ring-ring ring-offset-2'
                  )}
                  alt=""
                  {...nodeProps}
                />
                <ResizeHandle
                  className={mediaResizeHandleVariants({
                    direction: 'right'
                  })}
                  options={{ direction: 'right' }}
                />
              </Resizable>

              <Caption style={{ width }} align={align}>
                <CaptionTextarea
                  readOnly={readOnly}
                  onFocus={(e) => {
                    e.preventDefault()
                  }}
                  placeholder="Write a caption..."
                />
              </Caption>
            </figure>

            {children}
          </PlateElement>
        </MediaPopover>
      )
    }
  )
)
