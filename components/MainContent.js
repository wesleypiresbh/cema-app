// components/MainContent.js
export default function MainContent({ children }) {
  return (
    <main className="main-content">
      {children}

      <style jsx>{`
        .main-content {
          min-height: calc(100vh - 150px);
          padding: 20px;
          background: #f9f9f9;
        }
      `}</style>
    </main>
  )
}