/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthImport } from './routes/_auth'

// Create Virtual Routes

const AuthenticatedIndexLazyImport = createFileRoute('/_authenticated/')()
const AuthRegisterLazyImport = createFileRoute('/_auth/register')()
const AuthLoginLazyImport = createFileRoute('/_auth/login')()

// Create/Update Routes

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexLazyRoute = AuthenticatedIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any).lazy(() =>
  import('./routes/_authenticated/index.lazy').then((d) => d.Route),
)

const AuthRegisterLazyRoute = AuthRegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/register.lazy').then((d) => d.Route),
)

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any).lazy(() => import('./routes/_auth/login.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof AuthImport
    }
    '/_auth/register': {
      id: '/_auth/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof AuthRegisterLazyImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexLazyImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute
  AuthRegisterLazyRoute: typeof AuthRegisterLazyRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginLazyRoute: AuthLoginLazyRoute,
  AuthRegisterLazyRoute: AuthRegisterLazyRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface AuthenticatedRouteChildren {
  AuthenticatedIndexLazyRoute: typeof AuthenticatedIndexLazyRoute
}

const AuthenticatedRouteChildren: AuthenticatedRouteChildren = {
  AuthenticatedIndexLazyRoute: AuthenticatedIndexLazyRoute,
}

const AuthenticatedRouteWithChildren = AuthenticatedRoute._addFileChildren(
  AuthenticatedRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof AuthLoginLazyRoute
  '/register': typeof AuthRegisterLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/login': typeof AuthLoginLazyRoute
  '/register': typeof AuthRegisterLazyRoute
  '/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_authenticated': typeof AuthenticatedRouteWithChildren
  '/about': typeof AboutRoute
  '/_auth/login': typeof AuthLoginLazyRoute
  '/_auth/register': typeof AuthRegisterLazyRoute
  '/_authenticated/': typeof AuthenticatedIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/about' | '/login' | '/register' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/about' | '/login' | '/register' | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/_authenticated'
    | '/about'
    | '/_auth/login'
    | '/_auth/register'
    | '/_authenticated/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  AuthenticatedRoute: typeof AuthenticatedRouteWithChildren
  AboutRoute: typeof AboutRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  AuthenticatedRoute: AuthenticatedRouteWithChildren,
  AboutRoute: AboutRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_authenticated",
        "/about"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/register"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_auth/login": {
      "filePath": "_auth/login.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/register": {
      "filePath": "_auth/register.lazy.tsx",
      "parent": "/_auth"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.lazy.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
