package com.hatertruck.RedeBaratto.model;

public class CompraProduto{
    private int idCompra;
    private int idProduto;
    private int quantidade;

    public CompraProduto(int idCompra, int idProduto, int quantidade) {

        this.idCompra = idCompra;
        this.idProduto = idProduto;
        this.quantidade = quantidade;
    }

    public CompraProduto() {
    }
    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public int getIdProduto() {
        return idProduto;
    }

    public void setIdProduto(int idProduto) {
        this.idProduto = idProduto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
}
