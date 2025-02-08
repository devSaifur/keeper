'use client'

import db from '@/local/db'
import { Loader2, LogOutIcon } from 'lucide-react'

import { signOut, useSession } from '@/lib/auth-client'

import { ThemeToggle } from './theme-toggle'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

export const Navbar = () => {
  const { data, isPending } = useSession()

  async function handleLogout() {
    await db.notes.clear()
    await db.deletedNotes.clear()
    await signOut()
    // TODO: navigation here
  }

  return (
    <header className="sticky top-0 z-50 border-b border-muted-foreground/50 bg-background py-1 shadow transition-colors md:py-2">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="size-8"
            >
              <g id="sticky_note">
                <rect fill="#ffba55" x="4" y="4" width="40" height="5" />
                <path fill="#fc6" d="M44,4V7H9A3,3,0,0,1,6,4Z" />
                <polygon fill="#fc6" points="44 9 44 39 36 47 4 47 4 9 44 9" />
                <path fill="#ffde76" d="M44,9V39l-6,6H10a4,4,0,0,1-4-4V9Z" />
                <path
                  fill="#ffba55"
                  d="M39,18H9a1,1,0,0,1,0-2H39A1,1,0,0,1,39,18Z"
                />
                <path
                  fill="#ffba55"
                  d="M39,24H9a1,1,0,0,1,0-2H39A1,1,0,0,1,39,24Z"
                />
                <path
                  fill="#ffba55"
                  d="M39,30H9a1,1,0,0,1,0-2H39A1,1,0,0,1,39,30Z"
                />
                <path
                  fill="#ffba55"
                  d="M24,36H9a1,1,0,0,1,0-2H24A1,1,0,0,1,24,36Z"
                />
                <polygon fill="#ffba55" points="44 39 36 47 36 39 44 39" />
                <rect fill="#db5669" x="21" y="1" width="6" height="10" />
                <path
                  fill="#f26674"
                  d="M27,1c0,8.55-.1,8,0,8a4,4,0,0,1-4-4V1Z"
                />
              </g>
            </svg>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Keeper
            </h1>
          </div>
          <div className="flex items-center gap-x-4">
            <ThemeToggle />
            {data?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarFallback>
                      {data?.user.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="justify-center">
                    <Button
                      disabled={isPending}
                      variant="destructive"
                      size="sm"
                      className="dark:bg-red-700"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="size-4" />
                      {isPending ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        'Logout'
                      )}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
