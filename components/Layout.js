// components/Layout.js
import TopNav from './TopNav'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <div className="content">
        {/* TopNav */}
        <TopNav />

        {/* Conteúdo Dinâmico */}
        {children}
      </div>
    </div>
  )
}
