package com.saep.kanban.repository;

import com.saep.kanban.enums.Prioridade;
import com.saep.kanban.enums.Status;
import com.saep.kanban.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByStatus(Status status);
    List<Task> findAllByPrioridade(Prioridade prioridade);
}
