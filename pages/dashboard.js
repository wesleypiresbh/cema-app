// pages/dashboard.js

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import Sidebar from '../components/Sidebar'
import TopNav from '../components/TopNav'
import Header from '../components/Header'
import MainContent from '../components/MainContent'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [nomeUsuario, setNomeUsuario] = useState('Carregando...')
  const [tipoUsuario, setTipoUsuario] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      if (data.user) {
        console.log("ID do usuário logado:", data.user.id)

        try {
          const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('nome, tipo')
            .eq('id', data.user.id)
            .single()

          if (error) {
            console.error("Erro ao buscar usuário:", error)
            setNomeUsuario("Erro ao carregar")
          } else if (usuario) {
            setNomeUsuario(usuario.nome)
            setTipoUsuario(usuario.tipo)
          } else {
            setNomeUsuario("Usuário não encontrado")
          }
        } catch (err) {
          console.error("Erro inesperado:", err)
          setNomeUsuario("Erro ao carregar")
        }
      }
    }

    fetchUser()
  }, [])

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Erro ao sair:', error.message)
    } else {
      window.location.href = '/' // ou '/' dependendo da sua rota de login
    }
  }

  return (
    <div className="app">
      <Sidebar
        nomeUsuario={nomeUsuario}
        tipoUsuario={tipoUsuario}
        onLogout={handleLogout}
      />

      <div className="content">
        <Header />
        <TopNav />
        <MainContent>
          {/* Conteúdo dinâmico aqui */}
        </MainContent>
      </div>

      <style jsx>{`
        .app {
          display: flex;
          height: 100vh;
          font-family: sans-serif;
        }

        .content {
          flex: 1;
          padding: 20px;
          margin-left: 200px;
          margin-top: 18px;
        }
      `}</style>
    </div>
  )
}
