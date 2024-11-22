package com.saep.kanban.service;

import com.saep.kanban.dto.task.TaskCreateDTO;
import com.saep.kanban.dto.task.TaskDetailsDTO;
import com.saep.kanban.dto.task.TaskUpdateDTO;

import java.util.List;

public interface TaskService {
    TaskDetailsDTO getById(Long idTask);
    List<TaskDetailsDTO> getAllTask();
    TaskDetailsDTO createUser(TaskCreateDTO data);
    List<TaskDetailsDTO> getByStatus(String status);
    List<TaskDetailsDTO> getByPrioridade(String prioridade);
    TaskDetailsDTO updateTask(Long idTask, TaskUpdateDTO taskUpdateDTO);
    void deleteTask(Long idTask);
}
