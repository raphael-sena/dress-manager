package com.DressManager.dressmanager.model;

import com.DressManager.dressmanager.model.enums.Cor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ITEM")
public class Item {

	@Id
	@Column(name = "id", unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String descricao;
	private String modelo;
	private int quantidade;
	private double valorVenda;
	private double valorAluguel;

	@ManyToOne
    @JoinColumn(name = "fornecedor_id")
	@JsonIgnoreProperties("itens")
    private Fornecedor fornecedor;

	private String observacao;

	@Enumerated(EnumType.STRING) 
    private Cor cor;

	@Column(name = "imagem", columnDefinition = "BYTEA")
	private byte[] imagem;
}

