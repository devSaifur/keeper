import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { api } from '@/lib/api'

export const useGetNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const res = await api.notes.$get()
      if (!res.ok) {
        return toast.error('Something went wrong getting notes!')
      }
      return res.json()
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 // 1 minute
  })
}
