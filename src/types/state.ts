import type { DropResult } from '@hello-pangea/dnd'

export type TicketType = {
  id: string
  label: string
  status: 'todo' | 'in-progress' | 'completed' | 'qa'
}

export type TicketContextType = {
  tickets: TicketType[] | undefined
  getTicketsPerStatus: (status: TicketType['status']) => TicketType[]
  onDragEnd: (result: DropResult) => void
  deleteTicket: (ticketId: TicketType['id']) => void
  createTicket: (label: TicketType['label']) => void
}