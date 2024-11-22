package com.saep.kanban.dto.task;

import com.saep.kanban.enums.Prioridade;
import com.saep.kanban.enums.Status;
import com.saep.kanban.models.Task;

import java.time.LocalDate;

public record TaskDetailsDTO(Long idTask,
                             String descricao,
                             String setor,
                             Prioridade prioridade,
                             LocalDate data_cadastro,
                             Status status,
                             String nomeResponsavel) {
    public TaskDetailsDTO(Task task) {
        this(task.getIdTask(), task.getDescricao(), task.getSetor(), task.getPrioridade(),
                task.getData_cadastro(), task.getStatus(), task.getUser().getNome());
    }
}
