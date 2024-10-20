import type { TicketType } from '@/types/state'

export const TICKET_STATUSES: Array<TicketType['status']> = ["todo", "in-progress", "completed", "qa"]

export const TICKETS_STORAGE_KEY = 'stored-tickets'