// components/Sidebar.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Sidebar({ onLogout }) {
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...')
  const [tipoUsuario, setTipoUsuario] = useState(null)
  const [saudacao, setSaudacao] = useState('')
  const [loading, setLoading] = useState(true)

  // Buscar dados do usuário e definir saudação
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        window.location.href = '/'
        return
      }

      const { data: userData, error } = await supabase
        .from('usuarios')
        .select('nome, tipo')
        .eq('id', data.user.id)
        .single()

      if (error || !userData) {
        console.error("Erro ao buscar dados do usuário:", error)
        return
      }

      setNomeUsuario(userData.nome)
      setTipoUsuario(userData.tipo)

      // Definir saudação com base no horário
      const hora = new Date().getHours()
      let msg = ''

      if (hora < 12) {
        msg = 'Bom dia!'
      } else if (hora < 18) {
        msg = 'Boa tarde!'
      } else {
        msg = 'Boa noite!'
      }

      setSaudacao(msg)
      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) {
    return null
  }

  return (
    <div className="sidebar">
      <div className="profile">
        {/* Saudação */}
        <p className="greeting">{saudacao}</p>

        {/* Nome completo */}
        <p className="name">{nomeUsuario}</p>
      </div>

      <nav className="menu">
        <a href="/dashboard" className="menu-item">Dashboard</a>
        <a href="/agenda" className="menu-item active">Agenda</a>
        <a href="/financeiro" className="menu-item">Financeiro</a>
        <a href="/sistema" className="menu-item">Sistema</a>
        <a href="/cadastro-de-aulas" className="menu-item">Cadastro de Aulas</a>
        <a href="/perfil" className="menu-item">Perfil</a>
      </nav>

      <button className="logout-btn" onClick={onLogout}>Sair</button>

      <style jsx>{`
        .sidebar {
          width: 200px;
          background: #673ab7;
          color: white;
          padding: 20px;
          position: fixed;
          top: 0;
          bottom: 0;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .profile {
          text-align: center;
          margin-top: 40px;
          margin-bottom: 20px;
          width: 100%;
        }

        .greeting {
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 4px;
          color: #e0e0e0;
          text-align: center;
        }

        .name {
          margin-top: 0;
          font-weight: bold;
          text-align: center;
        }

        .menu {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        .menu-item {
          width: 100%;
          padding: 10px 20px;
          text-decoration: none;
          color: white;
          transition: background 0.3s ease;
          text-align: center;
          border-radius: 4px;
        }

        .menu-item:hover,
        .menu-item.active {
          background: #512da8;
        }

        .logout-btn {
          margin-top: auto;
          width: 100%;
          padding: 10px 20px;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
          text-align: center;
        }

        .logout-btn:hover {
          background: #1e88e5;
        }
      `}</style>
    </div>
  )
}
