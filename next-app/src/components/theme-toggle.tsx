import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <MoonIcon className="size-5 text-gray-200" />
      ) : (
        <SunIcon className="size-5 text-gray-600" />
      )}
    </button>
  )
}
