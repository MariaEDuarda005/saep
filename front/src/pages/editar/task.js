import React, { useState, useEffect } from "react";
import './styles.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../../components/Header";
import config from "../../config";

const TaskForm = () => {

  const navigate = useNavigate(); 

  const { idTask } = useParams(); 
  const [task, setTask] = useState(null); 
  const [loading, setLoading] = useState(true); 
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
    axios.get(`${config.apiUrl}/user`)
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Carrega os dados da tarefa para edição
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/task/${idTask}`);
        console.log('Dados da Tarefa:', response.data); // Verifique se os dados estão sendo retornados
        const taskData = response.data;
  
        console.log("Taskdata:", taskData);
  
        setTask(taskData);
  
        // Verifica se há idUser antes de atribuir
        setFormData({
          idUser: taskData.idUser || "",  // Caso tenha idUser, atribui esse valor
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

    axios.put(`${config.apiUrl}/task/${idTask}`, payload)
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
    <div className="task-container">
      <Header />
      <h2>Editar Tarefa</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="input-group">
          <label>Usuário:</label>
          <select name="idUser" value={formData.idUser} onChange={handleChange} required>
          <option value="">Selecione um usuário</option>
            {usuarios.map((usuario) => (
              <option key={usuario.idUser} value={usuario.idUser}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Descrição da Tarefa:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Setor:</label>
          <input type="text" name="setor" value={formData.setor} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Prioridade:</label>
          <select name="prioridade" value={formData.prioridade} onChange={handleChange} required>
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
          </select>
        </div>

        <div className="input-group">
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
