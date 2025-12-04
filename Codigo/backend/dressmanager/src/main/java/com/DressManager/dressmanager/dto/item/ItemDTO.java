package com.DressManager.dressmanager.dto.item;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import com.DressManager.dressmanager.model.enums.Cor;
import com.DressManager.dressmanager.model.Fornecedor;
import com.DressManager.dressmanager.model.Item;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemDTO {

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


    public ItemDTO(Item item){
        this.id = item.getId();
        this.descricao = item.getDescricao();
		this.modelo = item.getModelo();
		this.quantidade = item.getQuantidade();
		this.valorAluguel = item.getValorAluguel();
		this.valorVenda = item.getValorVenda();     
        this.cor = item.getCor();
		this.observacao = item.getObservacao();
		this.fornecedor = item.getFornecedor();
        this.imagemBase64 = item.getImagem() != null ? Base64.getEncoder().encodeToString(item.getImagem()) : null;

    }


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

        public static List<ItemDTO> converter(List<Item> itens) {
        return itens.stream().map(ItemDTO::new).collect(Collectors.toList());
    }
    
}
