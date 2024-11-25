package com.saep.kanban.enums;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Status {
    AFAZER, FAZENDO, PRONTO;

    @JsonCreator
    public static Status fromValue(String value) {
        switch (value.toUpperCase().replace("_", "")) {
            case "AFAZER":
                return AFAZER;
            case "FAZENDO":
                return FAZENDO;
            case "PRONTO":
                return PRONTO;
            default:
                throw new IllegalArgumentException("Status inválido: " + value);
        }
    }
}

