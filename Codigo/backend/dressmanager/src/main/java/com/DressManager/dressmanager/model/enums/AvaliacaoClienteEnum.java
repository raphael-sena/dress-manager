package com.DressManager.dressmanager.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum AvaliacaoClienteEnum {
    OTIMA(5),
    BOM(4),
    MEDIA(3),
    RUIM(2),
    PESSIMA(1);

    private final int valor;

    AvaliacaoClienteEnum(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }

    @JsonCreator
    public static AvaliacaoClienteEnum fromValor(int valor) {
        for (AvaliacaoClienteEnum avaliacao : AvaliacaoClienteEnum.values()) {
            if (avaliacao.getValor() == valor) {
                return avaliacao;
            }
        }
        throw new IllegalArgumentException("Valor inválido para avaliação: " + valor);
    }

    @JsonValue
    public int toValor() {
        return valor;
    }
}
