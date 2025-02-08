'use client'

import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { cn } from '@udecode/cn'
import { Check, ChevronRight, Circle } from 'lucide-react'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ({
  label,
  ...props
}: React.ComponentPropsWithRef<typeof ContextMenuPrimitive.Group> & {
  label?: React.ReactNode
}) => {
  return (
    <>
      <ContextMenuSeparator
        className={cn(
          'hidden',
          'mb-0 shrink-0 peer-has-[[role=menuitem]]/menu-group:block peer-has-[[role=menuitemcheckbox]]/menu-group:block peer-has-[[role=option]]/menu-group:block'
        )}
      />

      <ContextMenuPrimitive.Group
        {...props}
        className={cn(
          'hidden',
          'peer/menu-group group/menu-group my-1.5 has-[[role=menuitem]]:block has-[[role=menuitemcheckbox]]:block has-[[role=option]]:block',
          props.className
        )}
      >
        {label && <ContextMenuLabel>{label}</ContextMenuLabel>}
        {props.children}
      </ContextMenuPrimitive.Group>
    </>
  )
}

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = ({
  children,
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) => (
  <ContextMenuPrimitive.SubTrigger
    className={cn(
      'outline-hidden mx-1 flex h-[28px] cursor-default select-none items-center rounded-sm px-2 text-sm focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto size-4" />
  </ContextMenuPrimitive.SubTrigger>
)
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.SubContent>) => (
  <ContextMenuPrimitive.SubContent
    className={cn(
      'z-50 min-w-32 overflow-hidden rounded-md border bg-popover py-1.5 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
)
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Content>) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      className={cn(
        'z-50 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
)
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = ({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Item> & {
  inset?: boolean
}) => (
  <ContextMenuPrimitive.Item
    className={cn(
      'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative mx-1 flex h-[28px] cursor-default select-none items-center rounded-sm px-2 text-sm focus:bg-accent focus:text-accent-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = ({
  checked,
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>) => (
  <ContextMenuPrimitive.CheckboxItem
    className={cn(
      'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm focus:bg-accent focus:text-accent-foreground',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="size-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
)
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>) => (
  <ContextMenuPrimitive.RadioItem
    className={cn(
      'outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm focus:bg-accent focus:text-accent-foreground',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="size-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
)
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = ({
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
  inset?: boolean
}) => (
  <ContextMenuPrimitive.Label
    className={cn(
      'px-2 py-1.5 text-sm font-semibold text-foreground',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
)
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuPrimitive.Separator>) => (
  <ContextMenuPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
)
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
