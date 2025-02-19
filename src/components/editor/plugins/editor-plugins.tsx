'use client'

import { CalloutPlugin } from '@udecode/plate-callout/react'
import { DatePlugin } from '@udecode/plate-date/react'
import {
  FontBackgroundColorPlugin,
  FontColorPlugin,
  FontSizePlugin
} from '@udecode/plate-font/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { JuicePlugin } from '@udecode/plate-juice'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { ColumnPlugin } from '@udecode/plate-layout/react'
import { MarkdownPlugin } from '@udecode/plate-markdown'
import { SlashPlugin } from '@udecode/plate-slash-command/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block'

import { FixedToolbarPlugin } from '@/components/editor/plugins/fixed-toolbar-plugin'
import { FloatingToolbarPlugin } from '@/components/editor/plugins/floating-toolbar-plugin'

import { alignPlugin } from './align-plugin'
import { autoformatPlugin } from './autoformat-plugin'
import { basicNodesPlugins } from './basic-nodes-plugins'
import { blockMenuPlugins } from './block-menu-plugins'
import { cursorOverlayPlugin } from './cursor-overlay-plugin'
import { deletePlugins } from './delete-plugins'
import { equationPlugins } from './equation-plugins'
import { exitBreakPlugin } from './exit-break-plugin'
import { indentListPlugins } from './indent-list-plugins'
import { lineHeightPlugin } from './line-height-plugin'
import { linkPlugin } from './link-plugin'
import { resetBlockTypePlugin } from './reset-block-type-plugin'
import { softBreakPlugin } from './soft-break-plugin'
import { tablePlugin } from './table-plugin'
import { tocPlugin } from './toc-plugin'

export const viewPlugins = [
  ...basicNodesPlugins,
  HorizontalRulePlugin,
  linkPlugin,
  DatePlugin,
  tablePlugin,
  TogglePlugin,
  tocPlugin,
  ...equationPlugins,
  CalloutPlugin,
  ColumnPlugin,

  // Marks
  FontColorPlugin,
  FontBackgroundColorPlugin,
  FontSizePlugin,
  HighlightPlugin,
  KbdPlugin,

  // Block Style
  alignPlugin,
  ...indentListPlugins,
  lineHeightPlugin
] as const

export const editorPlugins = [
  // Nodes
  ...viewPlugins,

  // Functionality
  SlashPlugin,
  autoformatPlugin,
  cursorOverlayPlugin,
  ...blockMenuPlugins,
  exitBreakPlugin,
  resetBlockTypePlugin,
  ...deletePlugins,
  softBreakPlugin,
  TrailingBlockPlugin,

  // Deserialization
  MarkdownPlugin.configure({ options: { indentList: true } }),
  JuicePlugin,

  // UI
  FixedToolbarPlugin,
  FloatingToolbarPlugin
]
