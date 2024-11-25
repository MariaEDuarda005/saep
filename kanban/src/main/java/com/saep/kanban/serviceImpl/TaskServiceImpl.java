package com.saep.kanban.serviceImpl;

import com.saep.kanban.dto.task.TaskCreateDTO;
import com.saep.kanban.dto.task.TaskDetailsDTO;
import com.saep.kanban.dto.task.TaskPatchDTO;
import com.saep.kanban.dto.task.TaskUpdateDTO;
import com.saep.kanban.enums.Prioridade;
import com.saep.kanban.enums.Status;
import com.saep.kanban.infra.exception.NotFoundException;
import com.saep.kanban.models.Task;
import com.saep.kanban.models.User;
import com.saep.kanban.repository.TaskRepository;
import com.saep.kanban.repository.UserRepository;
import com.saep.kanban.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public TaskDetailsDTO getById(Long idTask) {
        // Busca a tarefa pelo ID
        Task task = taskRepository.findById(idTask)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        // Retorna o DTO de detalhes da tarefa
        return new TaskDetailsDTO(
                task.getIdTask(),
                task.getDescricao(),
                task.getSetor(),
                task.getPrioridade(),
                task.getData_cadastro(),
                task.getStatus(),
                task.getUser().getNome()
        );
    }

    @Override
    public List<TaskDetailsDTO> getAllTask() {
        List<Task> tasks = taskRepository.findAll();

        // Converte as tarefas para DTOs e retorna
        return tasks.stream()
                .map(task -> new TaskDetailsDTO(
                        task.getIdTask(),
                        task.getDescricao(),
                        task.getSetor(),
                        task.getPrioridade(),
                        task.getData_cadastro(),
                        task.getStatus(),
                        task.getUser().getNome()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDetailsDTO createUser(TaskCreateDTO data) {
        // Busca o usuário responsável pela tarefa
        User user = userRepository.findById(data.idUser())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Task task = new Task(data);

        // Associa o usuário à tarefa
        task.setUser(user);
        task = taskRepository.save(task);

        return new TaskDetailsDTO(task);
    }

    @Override
    public List<TaskDetailsDTO> getByStatus(String status) {
        // Converte a string para o enum Status
        Status statusEnum = Status.valueOf(status);

        // Busca todas as tarefas com o status fornecido
        List<Task> tasks = taskRepository.findAllByStatus(statusEnum);

        // Converte as tarefas para DTOs e retorna
        return tasks.stream()
                .map(task -> new TaskDetailsDTO(
                        task.getIdTask(),
                        task.getDescricao(),
                        task.getSetor(),
                        task.getPrioridade(),
                        task.getData_cadastro(),
                        task.getStatus(),
                        task.getUser().getNome() // Nome do responsável
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<TaskDetailsDTO> getByPrioridade(String prioridade) {
        // Converte a string para o enum Status
        Prioridade prioridadeEnum = Prioridade.valueOf(prioridade);

        // Busca todas as tarefas com o status fornecido
        List<Task> tasks = taskRepository.findAllByPrioridade(prioridadeEnum);

        // Converte as tarefas para DTOs e retorna
        return tasks.stream()
                .map(task -> new TaskDetailsDTO(
                        task.getIdTask(),
                        task.getDescricao(),
                        task.getSetor(),
                        task.getPrioridade(),
                        task.getData_cadastro(),
                        task.getStatus(),
                        task.getUser().getNome() // Nome do responsável
                ))
                .collect(Collectors.toList());
    }

    @Override
    public TaskDetailsDTO patchTask(Long idTask, TaskPatchDTO taskPatchDTO) {
        Task task = taskRepository.findById(idTask)
                .orElseThrow(() -> new NotFoundException("Task id não encontrado"));

        if (taskPatchDTO.status() != null){
            task.setStatus(taskPatchDTO.status());
        }

        taskRepository.save(task);
        return new TaskDetailsDTO(task);
    }

    @Override
    public TaskDetailsDTO updateTask(Long idTask, TaskUpdateDTO taskUpdateDTO) {
        Task task = taskRepository.findById(idTask).orElseThrow(
                () -> new NotFoundException("Task id não encontrado")
        );

        // Atualizar os campos da tarefa com os dados do DTO
        if (taskUpdateDTO.descricao() != null) {
            task.setDescricao(taskUpdateDTO.descricao());
        }
        if (taskUpdateDTO.setor() != null) {
            task.setSetor(taskUpdateDTO.setor());
        }
        if (taskUpdateDTO.prioridade() != null) {
            task.setPrioridade(taskUpdateDTO.prioridade());
        }
        if (taskUpdateDTO.status() != null) {
            task.setStatus(taskUpdateDTO.status());
        }

        if (taskUpdateDTO.idUser() != null) {
            User user = userRepository.findById(taskUpdateDTO.idUser()).orElseThrow(
                    () -> new NotFoundException("User id não encontrado")
            );
            task.setUser(user);
        }

        // Salvar a tarefa atualizada no banco
        task = taskRepository.save(task);

        // Retornar os detalhes da tarefa atualizada
        return new TaskDetailsDTO(task);
    }

    @Override
    public void deleteTask(Long idTask) {
        var task = taskRepository.findById(idTask).orElseThrow(() ->
                new NotFoundException("Id task não encontrado"));

        if (task != null){
            taskRepository.deleteById(idTask);
        }
    }
}
