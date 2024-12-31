import { CalloutPlugin } from '@udecode/plate-callout/react'
import { ParagraphPlugin } from '@udecode/plate-common/react'
import { DatePlugin } from '@udecode/plate-date/react'
import { DocxPlugin } from '@udecode/plate-docx'
import { EmojiPlugin } from '@udecode/plate-emoji/react'
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
import { TogglePlugin } from '@udecode/plate-toggle/react'
import { TrailingBlockPlugin } from '@udecode/plate-trailing-block'

import { basicNodesPlugins } from './basic-nodes-plugins'
import { equationPlugins } from './equation-plugins'
import { exitBreakPlugin } from './exit-break-plugin'
import { indentListPlugins } from './indent-list-plugins'
import { lineHeightPlugin } from './line-height-plugin'
import { linkPlugin } from './link-plugin'
import { softBreakPlugin } from './soft-break-plugin'
import { tablePlugin } from './table-plugin'

export const viewPlugins = [
  ...basicNodesPlugins,
  HorizontalRulePlugin,
  linkPlugin,
  DatePlugin,

  tablePlugin,
  TogglePlugin,
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
  ...indentListPlugins,
  lineHeightPlugin
] as const

export const editorPlugins = [
  // Nodes
  ...viewPlugins,

  // Functionality
  cursorOverlayPlugin,
  ...blockMenuPlugins,
  EmojiPlugin,
  exitBreakPlugin,
  resetBlockTypePlugin,
  ...deletePlugins,
  softBreakPlugin,
  TrailingBlockPlugin.configure({ options: { type: ParagraphPlugin.key } }),

  // Deserialization
  DocxPlugin,
  MarkdownPlugin.configure({ options: { indentList: true } }),
  JuicePlugin
]
