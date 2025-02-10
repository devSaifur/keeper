'use client'

import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { DeletePlugin, SelectOnBackspacePlugin } from '@udecode/plate-select'

export const deletePlugins = [
  SelectOnBackspacePlugin.configure({
    options: {
      query: {
        allow: [HorizontalRulePlugin.key]
      }
    }
  }),
  DeletePlugin
] as const
