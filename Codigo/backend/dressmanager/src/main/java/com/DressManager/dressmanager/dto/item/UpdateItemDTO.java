package com.DressManager.dressmanager.dto.item;

import java.util.Base64;

import com.DressManager.dressmanager.model.enums.Cor;
import com.DressManager.dressmanager.model.Fornecedor;
import com.DressManager.dressmanager.model.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateItemDTO {

    private Long id;
	private String descricao;
	private String modelo;
	private int quantidade;
	private double valorVenda;
    private double valorAluguel;
    private Fornecedor fornecedor;
	private String observacao;
    private Cor cor;
    private String imagemBase64;


    public void updateItem(Item item){
        item.setValorAluguel(valorAluguel);
        item.setValorVenda(valorVenda);
        item.setQuantidade(quantidade);
        item.setDescricao(descricao);
        item.setModelo(modelo);
        item.setCor(cor);
        item.setFornecedor(fornecedor);
        item.setObservacao(observacao);
        if (imagemBase64 != null) {
            item.setImagem(Base64.getDecoder().decode(imagemBase64));
        }

    }

    
}
