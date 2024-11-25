import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';  // Importe o arquivo CSS
import Header from '../../components/Header';

const GerenciamentoDeTarefas = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);  // Lista de usuários
    const [tasks, setTasks] = useState([]);  // Lista de tarefas
    const [statusOptions] = useState([
        { value: 'AFAZER', label: 'A Fazer' },
        { value: 'FAZENDO', label: 'Fazendo' },
        { value: 'PRONTO', label: 'Pronto' }
    ]);

    // Função para buscar os usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:8081/user');
            console.log("Dados retornados da API Usuario:", response.data);
            setUsuarios(response.data);  // Armazena os usuários na variável de estado
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
        }
    };

    // Função para buscar as tarefas
    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8081/task');
            console.log("Dados retornados da API tasks:", response.data);
            setTasks(response.data);
        } catch (error) {
            console.error("Erro ao buscar as tarefas:", error);
        }
    };

    // Chama as funções quando o componente é montado
    useEffect(() => {
        fetchUsuarios();
        fetchTasks();
    }, []);

    // Função para atualizar o status da tarefa
    const handleStatusChange = async (idTask, newStatus) => {
        console.log("ID da Tarefa:", idTask);
        console.log("Novo Status:", newStatus);

        // Encontre a tarefa que será atualizada
        const taskToUpdate = tasks.find(task => task.idTask === idTask);
        console.log("Tarefa para atualizar:", taskToUpdate);

        if (!taskToUpdate) {
            console.error("Tarefa não encontrada!");
            return;
        }

        try {
            const updatedTask = {
                ...taskToUpdate,
                status: newStatus, // Atualiza o status
            };

            console.log("Atualizando tarefa:", updatedTask);

            await axios.patch(`http://127.0.0.1:8081/task/${idTask}`, updatedTask);

            // Atualiza a lista localmente
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.idTask === idTask ? updatedTask : task
                )
            );

            alert("Status da tarefa atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o status da tarefa:", error);
            alert("Erro ao atualizar o status. Verifique os dados e tente novamente.");
        }
    };

    // Função para excluir a tarefa
    const handleDeleteTask = async (idTask) => {
        try {
            await axios.delete(`http://127.0.0.1:8081/task/deletar/${idTask}`);
            setTasks(prevTasks => prevTasks.filter(task => task.idTask !== idTask));
            alert("Tarefa excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
            alert("Erro ao excluir a tarefa. Tente novamente.");
        }
    };

    // Filtrando as tarefas por status
    const tasksByStatus = {
        AFAZER: tasks.filter(task => task.status === 'AFAZER'),
        FAZENDO: tasks.filter(task => task.status === 'FAZENDO'),
        PRONTO: tasks.filter(task => task.status === 'PRONTO')
    };

    return (
        <div>
            <Header />

            <div className="task-columns-container">
                <div className="task-column">
                    <h3>A Fazer</h3>
                    {tasksByStatus.AFAZER.map(task => (
                        <div key={task.idTask} className="taskCard">
                            <h4>{task.descricao}</h4>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {task.nomeResponsavel}</p> {/* Exibe o nome do usuário */}
                            <p><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>
                            <button onClick={() => navigate(`/editar-tarefa/${task.idTask}`)}>Editar</button>
                            <button onClick={() => handleDeleteTask(task.idTask)}>Excluir</button>
                            <button onClick={() => handleStatusChange(task.idTask, 'FAZENDO')}>Mover para Fazendo</button>
                        </div>
                    ))}
                </div>

                <div className="task-column">
                    <h3>Fazendo</h3>
                    {tasksByStatus.FAZENDO.map(task => (
                        <div key={task.idTask} className="taskCard">
                            <h4>{task.descricao}</h4>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {task.nomeResponsavel}</p> {/* Exibe o nome do usuário */}
                            <p><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>
                            <button onClick={() => navigate(`/editar-tarefa/${task.idTask}`)}>Editar</button>
                            <button onClick={() => handleDeleteTask(task.idTask)}>Excluir</button>
                            <button onClick={() => handleStatusChange(task.idTask, 'PRONTO')}>Mover para Pronto</button>
                        </div>
                    ))}
                </div>

                <div className="task-column">
                    <h3>Pronto</h3>
                    {tasksByStatus.PRONTO.map(task => (
                        <div key={task.idTask} className="taskCard">
                            <h4>{task.descricao}</h4>
                            <p><strong>Setor:</strong> {task.setor}</p>
                            <p><strong>Prioridade:</strong> {task.prioridade}</p>
                            <p><strong>Usuário:</strong> {task.nomeResponsavel}</p> {/* Exibe o nome do usuário */}
                            <p><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>
                            <button onClick={() => navigate(`/editar-tarefa/${task.idTask}`)}>Editar</button>
                            <button onClick={() => handleDeleteTask(task.idTask)}>Excluir</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GerenciamentoDeTarefas;
