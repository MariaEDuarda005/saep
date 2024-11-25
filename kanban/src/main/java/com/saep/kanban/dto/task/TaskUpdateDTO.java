package com.saep.kanban.dto.task;

import com.saep.kanban.enums.Prioridade;
import com.saep.kanban.enums.Status;

public record TaskUpdateDTO(String descricao,
                            String setor,
                            Prioridade prioridade,
                            Status status,
                            Long idUser) {
}
