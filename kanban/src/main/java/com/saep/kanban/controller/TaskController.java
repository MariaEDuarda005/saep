package com.saep.kanban.controller;

import com.saep.kanban.dto.task.TaskCreateDTO;
import com.saep.kanban.dto.task.TaskDetailsDTO;
import com.saep.kanban.dto.task.TaskUpdateDTO;
import com.saep.kanban.repository.TaskRepository;
import com.saep.kanban.serviceImpl.TaskServiceImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;

@RestController
@RequestMapping("task")
public class TaskController {

    @Autowired
    private TaskServiceImpl taskServiceImpl;

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/teste")
    public String hello(){
        return "Hello world";
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{idTask}")
    public ResponseEntity<TaskDetailsDTO> getTaskById(@PathVariable Long idTask) {
        try {
            TaskDetailsDTO taskDetails = taskServiceImpl.getById(idTask);
            return new ResponseEntity<>(taskDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<TaskDetailsDTO>> getAllTasks() {
        List<TaskDetailsDTO> tasks = taskServiceImpl.getAllTask();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/status/{status}")
    public ResponseEntity<List<TaskDetailsDTO>> getTasksByStatus(@PathVariable String status) {
        try {
            List<TaskDetailsDTO> tasks = taskServiceImpl.getByStatus(status);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Buscar tarefas por prioridade
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<List<TaskDetailsDTO>> getTasksByPrioridade(@PathVariable String prioridade) {
        try {
            List<TaskDetailsDTO> tasks = taskServiceImpl.getByPrioridade(prioridade);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/cadastrar")
    @Transactional
    public ResponseEntity<TaskDetailsDTO> createTask(@RequestBody TaskCreateDTO taskCreateDTO, UriComponentsBuilder uriComponentsBuilder) {
        TaskDetailsDTO task = taskServiceImpl.createUser(taskCreateDTO);
        var uri = uriComponentsBuilder.path("/task/{id}").buildAndExpand(task.idTask()).toUri();
        return ResponseEntity.created(uri).body(task);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PatchMapping("/{idTask}")
    @Transactional
    public ResponseEntity<TaskDetailsDTO> updateTask(@PathVariable Long idTask, @RequestBody TaskUpdateDTO updateDTO){
        var updateTask = taskServiceImpl.updateTask(idTask, updateDTO);
        return ResponseEntity.ok(updateTask);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/deletar/{idTask}")
    public ResponseEntity<Void> deleteTasks(@PathVariable Long idTask){
        taskServiceImpl.deleteTask(idTask);
        return ResponseEntity.ok().build();
    }
}