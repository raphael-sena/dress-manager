package com.DressManager.dressmanager.dto.item;

import com.DressManager.dressmanager.model.enums.Cor;
import com.DressManager.dressmanager.model.Fornecedor;
import com.DressManager.dressmanager.model.Item;
import java.util.Base64;

import lombok.Getter;

@Getter
public class DetailItemDTO {
    
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


    public DetailItemDTO(Item item){
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


}
