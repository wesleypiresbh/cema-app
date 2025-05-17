import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CadastroPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [celular, setCelular] = useState('');
  const [tipo, setTipo] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();

    console.log("Dados do formulário:", { nome, email, senha, celular, tipo });

    const { data, error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      console.error("Erro ao criar usuário:", error);
      alert(error.message);
      return;
    }

    console.log("Usuário criado com sucesso:", data);

    const { error: dbError } = await supabase.from('usuarios').insert([
      {
        id: data.user.id,
        nome,
        celular,
        email,
        tipo,
      },
    ]);

    if (dbError) {
      console.error("Erro ao inserir dados no banco:", dbError);
      alert(dbError.message);
    } else {
      console.log("Usuário cadastrado no banco com sucesso!");
      alert('Cadastro realizado com sucesso!');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="text-center">
          <h1 className="title">Cadastro</h1>
          <p className="subtitle">CADASTRO CEMA</p>
        </div>

        <form onSubmit={handleCadastro} className="form">
          <div className="input-group">
            <label htmlFor="nome" className="label">
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome completo"
              className="input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="celular" className="label">
              Celular
            </label>
            <input
              type="tel"
              id="celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              placeholder="(00) 00000-0000"
              className="input"
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="tipo" className="label">
              Tipo de Usuário
            </label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              required
              className="input"
            >
              <option value="">Escolha uma opção</option>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
              <option value="Administrativo">Administrativo</option>
            </select>
          </div>

          <button type="submit" className="btn">
            Cadastrar
          </button>
        </form>

        <div className="footer">
          {/* Substituir "Já tem conta? Faça login" por um botão "Voltar" */}
          <button onClick={() => window.history.back()} className="btn-back">
            Voltar
          </button>
        </div>
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
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
          flex-grow: 1;
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

        .input,
        .btn {
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
          background: linear-gradient(to right, #2ecc71, #27ae60);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn:hover {
          background: linear-gradient(to right, #27ae60, #219150);
        }

        .footer {
          margin-top: 16px;
          text-align: center;
        }

        .btn-back {
          padding: 12px 20px;
          background: #4f46e5;
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-back:hover {
          background: #3730a3;
        }
      `}</style>
    </div>
  )
}
