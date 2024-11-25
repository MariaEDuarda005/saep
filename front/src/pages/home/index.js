import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'
import Header from '../../components/Header';


function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [msn, setMsn] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("passei aqui")
      const response = await axios.post('http://127.0.0.1:8081/user', { 
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
    <div className='containner'>
      <Header/>
      <main>
        <h2>Cadastro de Usuários</h2>
        <form className="formulario"
        onSubmit={handleSubmit}>
          <div className='teste' style={{ display: 'flex', alignItems: 'center', marginBottom: '25px', marginTop: '25px' }}>
            <label htmlFor="nome" style={{ flex: '1', marginRight: '10px' }}>Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ flex: '2', height: '10px', padding: 15, borderRadius: '7px' }}
            />
          </div>
          <div className='teste' style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <label htmlFor="email" style={{ flex: '1', marginRight: '10px' }}>Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ flex: '2', height: '5px', padding: 12, borderRadius: '7px' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className="botao-cadastrar">Cadastrar</button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <p style={{ color: 'green' }}>{msn}</p>
          </div>
        </form>
      </main>
    </div>
  );
}


export default Home;