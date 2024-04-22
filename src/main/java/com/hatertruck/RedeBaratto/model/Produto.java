package com.hatertruck.RedeBaratto.model;


public class Produto {
	private int idProduto;
	private String nome;
	private float preco;
	private CategoriaProduto categoria;
	private boolean fabricadoMari;
	private int qtdProduto;

	public enum CategoriaProduto {
		COMPUTADOR, NOTEBOOK, MONITOR, PROCESSADOR, MEMORIA, PLACA_DE_VIDEO, ARMAZENAMENTO,
		GABINETE, FONTE, MOUSE, TECLADO, DIVERSOS
	}
	
	public Produto(){};

	public Produto(String nome, float preco, CategoriaProduto categoria, boolean fabricadoMari, int quantidade) {
		this.nome = nome;
		this.preco = preco;
		this.categoria = categoria;
		this.fabricadoMari = fabricadoMari;
		this.qtdProduto = quantidade;
	}

	public int getIdProduto() {
		return idProduto;
	}

	public void setIdProduto(int idProduto) {
		this.idProduto = idProduto;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public float getPreco() {
		return preco;
	}

	public void setPreco(float preco) {
		this.preco = preco;
	}

	public CategoriaProduto getCategoria() {
		return categoria;
	}

	public void setCategoria(CategoriaProduto categoria) {
		this.categoria = categoria;
	}

	public boolean getFabricadoMari() {
		return fabricadoMari;
	}

	public void setFabricadoMari(boolean fab_mari) {
		this.fabricadoMari = fab_mari;
	}

	public int getQtdProduto() {
		return qtdProduto;
	}

	public void setQtdProduto(int quantidade) {
		this.qtdProduto = quantidade;
	}

	@Override
	public String toString() {
		return "Produto{" +
				"idProduto=" + idProduto +
				", nome='" + nome + '\'' +
				", preco=" + preco +
				", categoria=" + categoria +
				", fab_mari=" + fabricadoMari +
				", quantidade=" + qtdProduto +
				'}';
	}
}