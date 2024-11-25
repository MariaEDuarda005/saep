import React from 'react';
import { Link } from 'react-router-dom'; // Certifique-se de ter o react-router-dom instalado
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <h1 className="title">Gerenciador de Tarefas</h1>
      <nav className="nav">
        <Link className="Link" to="/cadastro-usuarios">Cadastro de Usuários</Link>
        <Link className="Link" to="/cadastrar-tarefas">Cadastro de Tarefas</Link>
        <Link className="Link" to="/gerenciar-tarefas">Gerenciar Tarefas</Link>
      </nav>
    </header>
  );
}

export default Header;