import React, { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";
import Header from "../../components/Header";
import config from "../../config";

const TaskForm = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    idUser: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get(`${config.apiUrl}/user`)  // Ajuste para o endpoint correto do backend
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para enviar os dados do formulário para a API
  const handleSubmit = (e) => {
    e.preventDefault();

    // Exibe os dados enviados no console para depuração
    console.log("Dados enviados:", formData);

    // Ajusta para enviar os dados para o backend
    axios.post(`${config.apiUrl}/task/cadastrar`, {
      descricao: formData.descricao,
      setor: formData.setor,
      prioridade: formData.prioridade.toUpperCase(), 
      status: formData.status.toUpperCase(), 
      idUser: formData.idUser,
    })
      .then(response => {
        alert("Tarefa cadastrada com sucesso!");
        setFormData({
          idUser: "",
          descricao: "",
          setor: "",
          prioridade: "baixa",
          status: "a_fazer",
        });
      })
      .catch(error => console.error("Erro ao cadastrar tarefa:", error));
  };

  return (
    <div>
      <Header />

      <h2>Cadastrar Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="idUser" value={formData.idUser} onChange={handleChange} required>
            <option value="">Selecione um usuário</option>
            {usuarios.map(user => (
              <option key={user.idUser} value={user.idUser}>{user.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>
        <div>
          <label>Setor:</label>
          <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
        </div>
        <div>
          <label>Prioridade:</label>
          <select name="prioridade" value={formData.prioridade} onChange={handleChange} required>
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="AFAZER">A Fazer</option>
            <option value="FAZENDO">Fazendo</option>
            <option value="PRONTO">Pronto</option>
          </select>
        </div>
        <button type="submit">Cadastrar Tarefa</button>
      </form>
    </div>
  );
};

export default TaskForm;
