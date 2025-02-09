'use client'

import React from 'react'
import { cn, withRef } from '@udecode/cn'
import { useMediaState } from '@udecode/plate-media/react'
import { ResizableProvider } from '@udecode/plate-resizable'
import { withHOC } from '@udecode/plate/react'

import { PlateElement } from './plate-element'

export const MediaAudioElement = withHOC(
  ResizableProvider,
  withRef<typeof PlateElement>(
    ({ children, className, nodeProps, ...props }, ref) => {
      const { unsafeUrl } = useMediaState()

      return (
        <PlateElement ref={ref} className={cn(className, 'mb-1')} {...props}>
          <figure
            className="group relative cursor-default"
            contentEditable={false}
          >
            <div className="h-16">
              <audio className="size-full" src={unsafeUrl} controls />
            </div>
          </figure>
          {children}
        </PlateElement>
      )
    }
  )
)
