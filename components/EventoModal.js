// components/EventoModal.js
import React from 'react'

export default function EventoModal({ isOpen, onClose, onSave, onDelete, event = null }) {
  const [title, setTitle] = React.useState(event?.title || '')
  const [descricao, setDescricao] = React.useState(event?.descricao || '')

  if (!isOpen) return null

  const handleSubmit = () => {
    onSave(title, descricao)
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      onDelete()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{event ? 'Editar Evento' : 'Novo Evento'}</h2>

        <div className="input-group">
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do evento"
            className="input"
          />
        </div>

        <div className="input-group">
          <label>Descrição</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhes do evento..."
            className="input"
            rows={4}
          />
        </div>

        <div className="actions">
          {event && (
            <button onClick={handleDelete} className="btn-delete">
              Excluir
            </button>
          )}
          <button onClick={handleSubmit} className="btn-save">
            Salvar
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancelar
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal {
          background: white;
          padding: 20px;
          width: 400px;
          max-width: 90%;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        label {
          font-weight: bold;
          display: block;
          margin-bottom: 6px;
        }

        .input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          margin-bottom: 16px;
        }

        .actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 16px;
        }

        .btn-save {
          background: #2ecc71;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-save:hover {
          background: #27ae60;
        }

        .btn-delete {
          background: #e74c3c;
          color: white;
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-delete:hover {
          background: #c0392b;
        }

        .btn-cancel {
          background: #ccc;
          color: #333;
          padding: 10px 16px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-cancel:hover {
          background: #bbb;
        }
      `}</style>
    </div>
  )
}
