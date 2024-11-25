import React, { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";

const TaskForm = () => {
  const { idTask } = useParams(); // Pega o ID da URL
  console.log("ID:", idTask)
  const [task, setTask] = useState(null); // Armazena a tarefa
  const [loading, setLoading] = useState(true); // Controle de carregamento
  const navigate = useNavigate(); // Para redirecionar após a edição
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários
  const [formData, setFormData] = useState({
    idUser: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  // Carrega a lista de usuários da API quando o componente é montado
  useEffect(() => {
    axios.get("http://localhost:8081/user")
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Carrega os dados da tarefa para edição
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8081/task/${idTask}`);
        console.log('Dados da Tarefa:', response.data); // Verifique se os dados estão sendo retornados
        const taskData = response.data;
        console.log("Taskdata:" + taskData)
        setTask(taskData);
        // Preenche o formulário com os dados da tarefa
        setFormData({
          idUser: taskData.idUser || "",
          descricao: taskData.descricao || "",
          setor: taskData.setor || "",
          prioridade: taskData.prioridade || "baixa",
          status: taskData.status || "a_fazer",
        });
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar a tarefa:', error);
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchTask();
  }, [idTask]);

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      idUser: formData.idUser,
      prioridade: formData.prioridade.toUpperCase(),
      status: formData.status.toUpperCase(),
    };

    axios.put(`http://127.0.0.1:8081/task/${idTask}`, payload)
      .then(response => {
        alert("Tarefa atualizada com sucesso!");
        navigate("/gerenciar-tarefas");
      })
      .catch(error => {
        console.error("Erro ao atualizar a tarefa:", error);
        alert("Erro ao atualizar a tarefa. Tente novamente.");
      });
  };

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Header/>

      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="idUser" value={formData.idUser} onChange={handleChange} required>
            {usuarios.map((usuario) => (
              <option key={usuario.idUser} value={usuario.idUser}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Descrição da Tarefa:</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Setor:</label>
          <input
            type="text"
            name="setor"
            value={formData.setor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Prioridade:</label>
          <select
            name="prioridade"
            value={formData.prioridade}
            onChange={handleChange}
            required
          >
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default TaskForm;
