// pages/agenda.js
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import EventoModal from '../components/EventoModal'
import { supabase } from '../lib/supabaseClient'

export default function AgendaPage() {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Carregar eventos do usuário logado
  const fetchEventos = async () => {
    const { data } = await supabase.auth.getUser()
    const userId = data?.user?.id

    if (!userId) return

    const { data: eventos, error } = await supabase
      .from('eventos')
      .select('*')
      .eq('usuario_id', userId)

    if (error) {
      console.error("Erro ao buscar eventos:", error)
      return
    }

    // Mapear eventos para o formato esperado pelo FullCalendar
    const eventosFormatados = eventos.map(evento => ({
      id: evento.id,
      title: evento.title,
      start: evento.start,
      end: evento.end_time,
      extendedProps: {
        descricao: evento.descricao
      }
    }))

    setEvents(eventosFormatados)
  }

  useEffect(() => {
    fetchEventos()
  }, [])

  // Clique em uma data vazia → novo evento
  const handleDateSelect = (info) => {
    const minDuration = 30 * 60 * 1000 // 30 minutos em milissegundos
    const start = new Date(info.startStr)
    const end = new Date(info.startStr)
    end.setTime(end.getTime() + minDuration)

    setSelectedEvent({
      start: start.toISOString(),
      end: end.toISOString(),
      title: '',
      descricao: ''
    })
    setShowModal(true)
  }

  // Clique em evento existente → editar
  const handleEventClick = (clickInfo) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      descricao: clickInfo.event.extendedProps.descricao || '',
      start: clickInfo.event.startStr,
      end: clickInfo.event.endStr
    })
    setShowModal(true)
  }

  // Salvar evento (criar ou atualizar)
  const handleSaveEvent = async (title, descricao) => {
    const { data } = await supabase.auth.getUser()
    const userId = data?.user?.id

    if (!userId) return

    const eventData = {
      usuario_id: userId,
      title,
      descricao,
      start: selectedEvent.start,
      end_time: selectedEvent.end,
    }

    let error
    if (selectedEvent.id) {
      // Se tiver ID → é edição
      const { error: updateError } = await supabase
        .from('eventos')
        .update(eventData)
        .eq('id', selectedEvent.id)
      error = updateError
    } else {
      // Se não tiver ID → é novo evento
      const { error: insertError } = await supabase
        .from('eventos')
        .insert([eventData])
      error = insertError
    }

    if (error) {
      alert("Erro ao salvar evento")
      console.error(error)
    } else {
      fetchEventos()
      setShowModal(false)
    }
  }

  // Excluir evento
  const handleDeleteEvent = async () => {
    const { error } = await supabase
      .from('eventos')
      .delete()
      .eq('id', selectedEvent.id)

    if (error) {
      alert("Erro ao excluir evento")
      console.error(error)
    } else {
      fetchEventos()
      setShowModal(false)
    }
  }

  // Fechar modal
  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
  }

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar onLogout={() => window.location.href = '/'} />

      {/* Conteúdo Principal */}
      <div className="content">
        <TopNav />
        <main className="main-content">
          <div className="calendar-container">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              events={events}
              selectable={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              editable={false}
              allDaySlot={false}
              slotMinTime="07:00:00"
              slotMaxTime="20:00:00"
              eventOverlap={false}
              height="auto"
            />
          </div>
        </main>
      </div>

      {/* Modal para adicionar/editar evento */}
      {showModal && (
        <EventoModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          event={selectedEvent}
        />
      )}

      <style jsx>{`
        .app {
          display: flex;
          height: 100vh;
          font-family: sans-serif;
        }

        .content {
          flex: 1;
          padding: 20px;
          margin-left: 200px; /* Largura do sidebar */
          background-color: #f9f9f9;
        }

        .main-content {
          min-height: calc(100vh - 80px);
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .calendar-container {
          max-width: 1000px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}
