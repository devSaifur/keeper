declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string
      JWT_SECRET: string
    }
  }
}

export type ENV = {
  Variables: {
    user: {
      id: string
      name: string
      email: string
    }
  }
}
