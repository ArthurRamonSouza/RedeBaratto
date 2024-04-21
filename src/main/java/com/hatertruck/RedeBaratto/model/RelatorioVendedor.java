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
	private Date dataRelatorio;
	private List<Integer> vendas;

	private static final Logger log = LoggerFactory.getLogger(RelatorioVendedor.class);

	public RelatorioVendedor(String cpfVendedor, float valorVendido, int relatorioDia, int relatorioMes,
			int relatorioAno, List<Integer> vendas) {
		super();
		this.cpfVendedor = cpfVendedor;
		this.valorVendido = valorVendido;
		String dataString = String.format("%d/%d/%d", relatorioDia, relatorioMes, relatorioAno);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy/MM/dd");

		try {
			Date data = dateFormat.parse(dataString);
			this.dataRelatorio = data;
		} catch (ParseException e) {
			log.info("Erro ao realizar o parsing da data: " + e.getMessage());
		}

		this.vendas = vendas;
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

	public Date getDataRelatorio() {
		return dataRelatorio;
	}

	public void setDataRelatorio(int relatorioDia, int relatorioMes,
			int relatorioAno) {
		String dataString = String.format("%d/%d/%d", relatorioDia, relatorioMes, relatorioAno);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yy/MM/dd");

		try {
			Date data = dateFormat.parse(dataString);
			this.dataRelatorio = data;
		} catch (ParseException e) {
			log.info("Erro ao realizar o parsing da data: " + e.getMessage());
		}
	}

	public void setDataRelatorio(Date dataRelatorio) {
		this.dataRelatorio = dataRelatorio;
	}

	public List<Integer> getVendas() {
		return vendas;
	}

	public void setVendas(List<Integer> vendas) {
		this.vendas = vendas;
	}
}
