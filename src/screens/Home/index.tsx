import { DragDropContext, Draggable, Droppable, type DraggableProvided } from '@hello-pangea/dnd'
import React, { useRef, type FormEvent } from 'react'

import { TICKET_STATUSES } from '@/config/constant'
import { useTicketContext } from '@/states/useTicketContext'
import type { TicketType } from '@/types/state'
import { LuX } from 'react-icons/lu'

const HomeScreen = () => {
  const { getTicketsPerStatus, onDragEnd, createTicket, deleteTicket } = useTicketContext()
  const labelInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = labelInputRef?.current?.value
    if (!value) return
    createTicket(value)
    labelInputRef.current.value = ''
  }

  return (
    <div className='h-full flex flex-col gap-4 items-center justify-center px-4'>
      <form onSubmit={handleSubmit}>
        <input ref={labelInputRef} name='label' className='bg-slate-900 text-white' />
      </form>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto gap-6 pb-4 h-[calc(100vh-150px)] mx-auto">
          {TICKET_STATUSES.map((status: TicketType['status']) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className='flex flex-col pt-4 flex-shrink-0 w-80 border rounded-md border-slate-700'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className='text-center text-lg font-bold uppercase'>{status}</h3>
                  {/* A column with tickets */}
                  <div className='overflow-y-auto h-full'>
                    {getTicketsPerStatus(status).map((item, idx) => (
                      <Draggable draggableId={item.id} index={idx} key={item.id}>
                        {(provided: DraggableProvided) => (
                          <div
                            className='cursor-pointer flex justify-between items-center px-3 my-2 border border-cyan-500 rounded mx-3'
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{item.label}</span>
                            <LuX color='red' className='cursor-pointer' onClick={() => deleteTicket(item.id)} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default HomeScreen