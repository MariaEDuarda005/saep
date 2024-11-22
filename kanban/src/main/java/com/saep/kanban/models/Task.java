package com.saep.kanban.models;

import com.saep.kanban.dto.task.TaskCreateDTO;
import com.saep.kanban.enums.Prioridade;
import com.saep.kanban.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Table(name = "task")
@Entity(name = "task")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idTask;

    // Relacionamento ManyToOne: Cada tarefa pertence a um único usuário
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    private String descricao;
    private String setor;

    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;

    private LocalDate data_cadastro;

    @Enumerated(EnumType.STRING)
    private Status status;

    public Task(TaskCreateDTO dados) {
        this.user = getUser();
        this.descricao = dados.descricao();
        this.setor = dados.setor();
        this.prioridade = dados.prioridade();
        this.data_cadastro = LocalDate.now();
        this.status = dados.status();
    }
}
