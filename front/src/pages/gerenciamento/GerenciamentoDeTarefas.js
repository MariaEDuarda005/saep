import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import Header from '../../components/Header';

const GerenciamentoDeTarefas = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);  // Lista de usuários
    const [tasks, setTasks] = useState([]);  // Lista de tarefas
    const [statusOptions] = useState([
        { value: 'a_fazer', label: 'A Fazer' },
        { value: 'fazendo', label: 'Fazendo' },
        { value: 'pronto', label: 'Pronto' }
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

    // Função para buscar o nome do usuário com base no ID
    const getUserNameById = (userId) => {
        console.log("u.id usuarios", usuarios)
        const user = usuarios.find(u => u.idUser === userId);  // Busca o usuário pelo ID
        return user ? user.nome : 'Usuário não encontrado';  // Retorna o nome ou mensagem de erro
    };

    // Função para atualizar o status da tarefa
    const handleStatusChange = async (idTask, newStatus) => {
        console.log("ID da Tarefa:", idTask);
        console.log("Novo Status:", newStatus);

        // Encontre a tarefa que será atualizada
        const taskToUpdate = tasks.find(task => task.id === idTask);
        console.log("id do update:", taskToUpdate);

        if (!taskToUpdate) {
            console.error("Tarefa não encontrada!");
            return;
        }

        try {
            // Enviar o objeto completo com o novo status
            const updatedTask = {
                ...taskToUpdate, // Copia todos os campos da tarefa
                status: newStatus, // Atualiza apenas o status
            };

            await axios.patch(`http://127.0.0.1:8081/tasks/${idTask}`, updatedTask);

            // Atualiza a lista localmente
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === idTask ? updatedTask : task
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
            setTasks(prevTasks => prevTasks.filter(task => task.id !== idTask));
            alert("Tarefa excluída com sucesso!");
        } catch (error) {
            console.error("Erro ao excluir a tarefa:", error);
            alert("Erro ao excluir a tarefa. Tente novamente.");
        }
    };

    return (
        <div>
            <Header/>

            <div style={styles.gridContainer}>
                {tasks.map((task) => (
                    <div key={task.idTask} style={styles.taskCard}>
                        <h3>{task.descricao}</h3>
                        <p><strong>Setor:</strong> {task.setor}</p>
                        <p><strong>Prioridade:</strong> {task.prioridade}</p>
                        <p><strong>Usuário:</strong> {getUserNameById(task.idTask)}</p> {/* Exibe o nome do usuário */}
                        <p><strong>Data de Cadastro:</strong> {new Date(task.data_cadastro).toLocaleDateString()}</p>
                        <div>{console.log("Task ID:", task.idTask)}</div>
                        
                        <button
                            onClick={() => navigate(`/editar-tarefa/${task.id}`)} // Navega para a página de edição
                            style={styles.updateButton}
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDeleteTask(task.id)} // Exclui a tarefa
                            style={styles.deleteButton}
                        >
                            Excluir
                        </button>
                        {/* Status editável */}
                        <div style={styles.statusContainer}>
                            <label><strong>Status:</strong></label>
                            <select
                                value={task.status} // Exibe o status atual da tarefa
                                onChange={(e) => {
                                    const newStatus = e.target.value;
                                    setTasks(prevTasks =>
                                        prevTasks.map(t =>
                                            t.id === task.id ? { ...t, status: newStatus } : t
                                        )
                                    );
                                }}
                                style={styles.statusDropdown}
                            >
                                {statusOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>

                            <button
                                onClick={() => handleStatusChange(task.id, task.status)} // Usa o status da tarefa
                                style={styles.updateButton}
                            >
                                Alterar status
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        padding: '20px',
    },
    taskCard: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: '#fff',
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
    },
    statusDropdown: {
        marginLeft: '10px',
        marginRight: '10px',
    },
    updateButton: {
        padding: '5px 10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
}

export default GerenciamentoDeTarefas;
