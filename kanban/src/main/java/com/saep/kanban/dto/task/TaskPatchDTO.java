package com.saep.kanban.dto.task;

import com.saep.kanban.enums.Status;

public record TaskPatchDTO(Status status) {
}
