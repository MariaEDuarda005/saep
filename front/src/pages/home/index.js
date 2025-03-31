import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'
import Header from '../../components/Header';
import config from "../../config";

function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [msn, setMsn] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("passei aqui")
      //const response = await axios.post(`http://localhost:8081/user`, { 
      const response = await axios.post(`${config.apiUrl}/user`, { 
        nome,
        email,
      });
      console.log('Usuário cadastrado:', response.data);
      setMsn('Cadastro concluído com sucesso!!!');
      setNome('');
      setEmail('');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMsn('Erro ao cadastrar usuário.');
    }
  };

  return (
    <div className='container'>
      <Header/>
      <main>
        <h2>Cadastro de Usuários</h2>
        <form className="formulario" onSubmit={handleSubmit}>
          <div className='input-group'>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className='input-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='button-container'>
            <button type="submit" className="botao-cadastrar">Cadastrar</button>
          </div>
          <div className='message-container'>
            <p className='mensagem'>{msn}</p>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Home;