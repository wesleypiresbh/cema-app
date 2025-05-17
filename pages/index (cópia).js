import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })
    if (error) alert(error.message)
    else window.location.href = '/dashboard' // Redireciona para dashboard
  }

  return (
    <div className="login-container">
      <div className="card">
        <div className="text-center">
          <h1 className="title">CEMA</h1>
          <p className="subtitle">Centro Educacional Mathias Andrade</p>
        </div>

        <form onSubmit={handleLogin} className="form">
          <div className="input-group">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seu@email.com"
              className="input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha" className="label">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
              className="input"
            />
          </div>

          <button type="submit" className="btn">
            Entrar
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(to bottom, #f0f8ff, #e0f0ff);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          font-family: sans-serif;
        }

        .card {
          width: 100%;
          max-width: 400px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          padding: 32px;
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: scale(1.01);
        }

        .title {
          font-size: 2rem;
          font-weight: bold;
          color: #1a3b70;
        }

        .subtitle {
          margin-top: 8px;
          font-size: 0.875rem;
          color: #666;
        }

        .form {
          margin-top: 24px;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 6px;
        }

        .input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: 0.2s ease;
        }

        .input:focus {
          border-color: #3182ce;
          box-shadow: 0 0 0 2px rgba(45, 150, 255, 0.4);
        }

        .btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(to right, #4f97eb, #3c69e7);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(to right, #3c69e7, #2e55c3);
        }
      `}</style>
    </div>
  )
}
