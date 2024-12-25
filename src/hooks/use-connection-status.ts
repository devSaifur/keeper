import { useSyncExternalStore } from 'react'

const getSnapshot = () => navigator.onLine

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener('offline', onStoreChange)
  window.addEventListener('online', onStoreChange)

  return () => {
    window.removeEventListener('offline', onStoreChange)
    window.removeEventListener('online', onStoreChange)
  }
}

export const useConnectionStatus = () =>
  useSyncExternalStore(subscribe, getSnapshot)
