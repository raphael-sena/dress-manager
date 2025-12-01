package com.DressManager.dressmanager.dto.item;

import com.DressManager.dressmanager.model.enums.Cor;
import com.DressManager.dressmanager.model.Fornecedor;
import com.DressManager.dressmanager.model.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Base64;


@Getter
@AllArgsConstructor
public class CreateItemDTO {

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

 
    
    public Item converter(){

        Item item = new Item();
        
        item.setId(id);
        item.setDescricao(descricao);
        item.setModelo(modelo);
        item.setQuantidade(quantidade);
        item.setValorVenda(valorVenda);
        item.setValorAluguel(valorAluguel);
        item.setCor(cor);
        item.setFornecedor(fornecedor);
        item.setObservacao(observacao);
        if (imagemBase64 != null) {
            item.setImagem(Base64.getDecoder().decode(imagemBase64));
        }

        return item;
    }

}
