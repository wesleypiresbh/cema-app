// components/TopNav.js
export default function TopNav() {
  return (
    <nav className="top-nav">
      <button className="nav-btn">Cadastro de Usuários</button>
      <button className="nav-btn">Cadastro de Alunos</button>
      <button className="nav-btn">Ficha de Aluno</button>
      <button className="nav-btn">Relatório de Turmas</button>
      <button className="nav-btn">Atividades da Semana</button>
      <button className="nav-btn">Relatório de Alunos</button>

      <style jsx>{`
        .top-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          margin-left: 210px;
        }

        .nav-btn {
          padding: 10px 20px;
          background: #ddd;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .nav-btn:hover {
          background: #ccc;
        }
      `}</style>
    </nav>
  )
}