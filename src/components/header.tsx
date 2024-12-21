import { StickyNoteIcon } from 'lucide-react'

import { ThemeToggle } from './theme-toggle'

export const Header = () => {
  return (
    <header className="bg-gray-200 shadow transition-colors dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <StickyNoteIcon className="size-8 text-yellow-500" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Keeper
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
