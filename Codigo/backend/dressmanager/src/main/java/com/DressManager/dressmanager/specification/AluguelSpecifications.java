package com.DressManager.dressmanager.specification;

import com.DressManager.dressmanager.model.Aluguel;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDate;

public class AluguelSpecifications {

    public static Specification<Aluguel> hasClienteNomes(String[] nomes) {
        return (root, query, cb) -> {
            if (nomes == null || nomes.length == 0 || (nomes.length == 1 && nomes[0].trim().isEmpty())) return null;
            return root.join("cliente").get("nome").in((Object[]) nomes);
        };
    }

    public static Specification<Aluguel> hasItemDescricao(String descricao) {
        return (root, query, cb) -> {
            if (descricao == null || descricao.trim().isEmpty()) return null;
            return cb.like(root.join("item").get("descricao"), "%" + descricao + "%");
        };
    }


    public static Specification<Aluguel> hasModelos(String[] modelos) {
        return (root, query, cb) -> {
            if (modelos == null || modelos.length == 0 || (modelos.length == 1 && modelos[0].trim().isEmpty())) return null;
            return root.join("item").get("modelo").in((Object[]) modelos);
        };
    }

    public static Specification<Aluguel> dataFimBetween(String dataInicio, String dataFim) {
        return (root, query, cb) -> {
            if (dataInicio == null || dataFim == null || dataInicio.trim().isEmpty() || dataFim.trim().isEmpty()) return null;
            LocalDate startDate = LocalDate.parse(dataInicio);
            LocalDate endDate = LocalDate.parse(dataFim);
            return cb.between(root.get("dataFim"), startDate, endDate);
        };
    }

    public static Specification<Aluguel> valorBetween(Double valorInicial, Double valorFinal) {
        return (root, query, cb) -> {
            if (valorInicial == null || valorFinal == null || valorInicial <= 0 || valorFinal <= 0) return null;
            return cb.between(root.get("item").get("valorAluguel"), valorInicial, valorFinal);
        };
    }

    public static Specification<Aluguel> isFinalizado() {
        return (root, query, cb) -> cb.lessThan(root.get("dataFim"), LocalDate.now());
    }
}
