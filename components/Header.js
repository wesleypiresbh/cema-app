// components/Header.js
export default function Header() {
  return (
    <header className="header">
      <h2 className="role">Administrativo</h2>

      <style jsx>{`
        .header {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          height: 18px;
          background: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .role {
          font-size: 1.2rem;
          color: #ff69b4;
          text-align: center;
          margin: 0 auto;
        }
      `}</style>
    </header>
  )
}