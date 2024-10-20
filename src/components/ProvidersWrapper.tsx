import React from 'react'

import { TicketContextProvider } from '@/states/useTicketContext'
import type { ChildrenType } from '@/types'

const ProvidersWrapper = ({ children }: ChildrenType) => {
  return (
    <TicketContextProvider>
      {children}
    </TicketContextProvider>
  )
}

export default ProvidersWrapper