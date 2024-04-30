package com.hatertruck.RedeBaratto.model;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RelatorioVendedor {
    private String cpfVendedor;
    private float valorVendido;
    private int mes;
    private int ano;

    private static final Logger log = LoggerFactory.getLogger(RelatorioVendedor.class);

    public RelatorioVendedor(String cpfVendedor, float valorVendido, int relatorioMes, int relatorioAno) {
        super();
        this.cpfVendedor = cpfVendedor;
        this.valorVendido = valorVendido;
        this.mes = relatorioMes;
        this.ano = relatorioAno;
    }

    public String getIdVendedor() {
        return cpfVendedor;
    }

    public void setIdVendedor(String idVendedor) {
        this.cpfVendedor = idVendedor;
    }

    public float getValorVendido() {
        return valorVendido;
    }

    public void setValorVendido(float valorVendido) {
        this.valorVendido = valorVendido;
    }

    public void setMes(int mes) {
        this.mes = mes;
    }

    public float getMes() {
        return this.mes;
    }

    public void setAno(int ano) {
        this.ano = ano;
    }

    public float getAno() {
        return this.ano;
    }
}
