'use client'

import { withProps } from '@udecode/cn'
import type { Value } from '@udecode/plate'
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin
} from '@udecode/plate-basic-marks/react'
import { BlockquotePlugin } from '@udecode/plate-block-quote/react'
import {
  CodeBlockPlugin,
  CodeLinePlugin,
  CodeSyntaxPlugin
} from '@udecode/plate-code-block/react'
import { DatePlugin } from '@udecode/plate-date/react'
import { HEADING_KEYS } from '@udecode/plate-heading'
import { TocPlugin } from '@udecode/plate-heading/react'
import { HighlightPlugin } from '@udecode/plate-highlight/react'
import { HorizontalRulePlugin } from '@udecode/plate-horizontal-rule/react'
import { KbdPlugin } from '@udecode/plate-kbd/react'
import { ColumnItemPlugin, ColumnPlugin } from '@udecode/plate-layout/react'
import { LinkPlugin } from '@udecode/plate-link/react'
import { EquationPlugin, InlineEquationPlugin } from '@udecode/plate-math/react'
import { SlashInputPlugin } from '@udecode/plate-slash-command/react'
import {
  TableCellHeaderPlugin,
  TableCellPlugin,
  TablePlugin,
  TableRowPlugin
} from '@udecode/plate-table/react'
import { TogglePlugin } from '@udecode/plate-toggle/react'
import {
  ParagraphPlugin,
  PlateLeaf,
  usePlateEditor,
  type CreatePlateEditorOptions
} from '@udecode/plate/react'

import { BlockquoteElement } from '@/components/plate-ui/blockquote-element'
import { CodeBlockElement } from '@/components/plate-ui/code-block-element'
import { CodeLeaf } from '@/components/plate-ui/code-leaf'
import { CodeLineElement } from '@/components/plate-ui/code-line-element'
import { CodeSyntaxLeaf } from '@/components/plate-ui/code-syntax-leaf'
import { ColumnElement } from '@/components/plate-ui/column-element'
import { ColumnGroupElement } from '@/components/plate-ui/column-group-element'
import { DateElement } from '@/components/plate-ui/date-element'
import { EquationElement } from '@/components/plate-ui/equation-element'
import { HeadingElement } from '@/components/plate-ui/heading-element'
import { HighlightLeaf } from '@/components/plate-ui/highlight-leaf'
import { HrElement } from '@/components/plate-ui/hr-element'
import { InlineEquationElement } from '@/components/plate-ui/inline-equation-element'
import { KbdLeaf } from '@/components/plate-ui/kbd-leaf'
import { LinkElement } from '@/components/plate-ui/link-element'
import { ParagraphElement } from '@/components/plate-ui/paragraph-element'
import { SlashInputElement } from '@/components/plate-ui/slash-input-element'
import {
  TableCellElement,
  TableCellHeaderElement
} from '@/components/plate-ui/table-cell-element'
import { TableElement } from '@/components/plate-ui/table-element'
import { TableRowElement } from '@/components/plate-ui/table-row-element'
import { TocElement } from '@/components/plate-ui/toc-element'
import { ToggleElement } from '@/components/plate-ui/toggle-element'

import { editorPlugins, viewPlugins } from './plugins/editor-plugins'

export const viewComponents = {
  [BlockquotePlugin.key]: BlockquoteElement,
  [BoldPlugin.key]: withProps(PlateLeaf, { as: 'strong' }),
  [CodeBlockPlugin.key]: CodeBlockElement,
  [CodeLinePlugin.key]: CodeLineElement,
  [CodePlugin.key]: CodeLeaf,
  [CodeSyntaxPlugin.key]: CodeSyntaxLeaf,
  [ColumnItemPlugin.key]: ColumnElement,
  [ColumnPlugin.key]: ColumnGroupElement,
  [DatePlugin.key]: DateElement,
  [EquationPlugin.key]: EquationElement,
  [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: 'h1' }),
  [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: 'h2' }),
  [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: 'h3' }),
  [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: 'h4' }),
  [HighlightPlugin.key]: HighlightLeaf,
  [HorizontalRulePlugin.key]: HrElement,
  [InlineEquationPlugin.key]: InlineEquationElement,
  [ItalicPlugin.key]: withProps(PlateLeaf, { as: 'em' }),
  [KbdPlugin.key]: KbdLeaf,
  [LinkPlugin.key]: LinkElement,
  [ParagraphPlugin.key]: ParagraphElement,
  [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: 's' }),
  [SubscriptPlugin.key]: withProps(PlateLeaf, { as: 'sub' }),
  [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: 'sup' }),
  [TableCellHeaderPlugin.key]: TableCellHeaderElement,
  [TableCellPlugin.key]: TableCellElement,
  [TablePlugin.key]: TableElement,
  [TableRowPlugin.key]: TableRowElement,
  [TocPlugin.key]: TocElement,
  [TogglePlugin.key]: ToggleElement,
  [UnderlinePlugin.key]: withProps(PlateLeaf, { as: 'u' })
}

export const editorComponents = {
  ...viewComponents,
  [SlashInputPlugin.key]: SlashInputElement
}

export const useCreateEditor = (
  {
    components,
    override,
    readOnly,
    ...options
  }: {
    components?: Record<string, any>
    plugins?: any[]
    readOnly?: boolean
  } & Omit<CreatePlateEditorOptions, 'plugins'> = {},
  deps: any[] = []
) => {
  return usePlateEditor<Value, (typeof editorPlugins)[number]>(
    {
      override: {
        components: {
          ...(readOnly ? viewComponents : editorComponents),
          ...components
        },
        ...override
      },
      plugins: (readOnly ? viewPlugins : editorPlugins) as any,
      ...options
    },
    deps
  )
}
