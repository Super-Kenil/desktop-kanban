import React, { createContext, useCallback, useContext, useState } from 'react'
import type { DropResult } from '@hello-pangea/dnd'

import type { ChildrenType } from '@/types'
import type { TicketContextType, TicketType } from '@/types/state'
import { TICKETS_STORAGE_KEY } from '@/config/constant'

const TicketContext = createContext<TicketContextType | undefined>(undefined)

const getAllTicketsFromStorage = () => {
  const foundTickets = localStorage.getItem(TICKETS_STORAGE_KEY)
  if (foundTickets) {
    const ticketsJson: TicketType[] = JSON.parse(foundTickets)
    return ticketsJson
  }
  return undefined
}

export const useTicketContext = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTicketContext must be used inside of TicketContextProvider')
  }
  return context
}

export const TicketContextProvider = ({ children }: ChildrenType) => {

  const [tickets, setTickets] = useState<TicketType[] | undefined>(getAllTicketsFromStorage())

  const updateTickets = useCallback((netTickets: TicketType[]) => {
    localStorage.setItem(TICKETS_STORAGE_KEY, JSON.stringify(netTickets))
    setTickets(netTickets)
  }, [])

  const createTicket = (newLabel: TicketType['label']) => {
    const newTicket: TicketType = {
      id: crypto.randomUUID(),
      label: newLabel,
      status: 'todo',
    }
    const allTickets = getAllTicketsFromStorage()
    if (allTickets) {
      const newAllTickets = allTickets
      newAllTickets.push(newTicket)
      updateTickets(newAllTickets)
    } else {
      updateTickets([newTicket])
    }
  }

  const deleteTicket = (ticketId: TicketType['id']) => {
    const allTickets = getAllTicketsFromStorage()
    if (allTickets) {
      const updatedTickets = allTickets.filter((ticket) => ticket.id !== ticketId)
      updateTickets(updatedTickets)
    }
  }

  const getTicketsPerStatus = useCallback((newStatus: TicketType['status']) => {
    return tickets.filter((ticket) => ticket.status === newStatus)
  }, [tickets])

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return
    let sourceOccurrence = source.index
    let destinationOccurrence = destination.index
    let sourceId = 0,
      destinationId = 0
    tickets.forEach((ticket, index) => {
      if (ticket.status === source.droppableId) {
        if (sourceOccurrence === 0) sourceId = index
        sourceOccurrence--
      }
      if (ticket.status === destination.droppableId) {
        if (destinationOccurrence === 0) destinationId = index
        destinationOccurrence--
      }
    })
    const ticket = tickets[sourceId]
    const newTickets = tickets.filter((_ticket) => _ticket.id !== ticket.id)
    ticket.status = destination.droppableId as TicketType['status']
    const parity = destination.droppableId != source.droppableId ? -1 : 0
    updateTickets([...newTickets.slice(0, destinationId + parity), ticket, ...newTickets.slice(destinationId + parity)])
  }

  return (
    <TicketContext.Provider value={{
      tickets,
      getTicketsPerStatus,
      createTicket,
      deleteTicket,
      onDragEnd
    }}>
      {children}
    </TicketContext.Provider>
  )
}