package com.hatertruck.RedeBaratto.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.hatertruck.RedeBaratto.factory.ConnectionFactory;
import com.hatertruck.RedeBaratto.model.RelatorioVendedor;
import com.hatertruck.RedeBaratto.model.Vendedor;

@Component
public class VendedorJdbc {

	private static final Logger log = LoggerFactory.getLogger(VendedorJdbc.class);
	private final JdbcTemplate jdbcTemplate;

	public VendedorJdbc(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	RowMapper<Vendedor> rowMapper = (rs, rowNum) -> {
		Vendedor vendedor = new Vendedor(rs.getString("cpf_vendedor"), rs.getString("prim_nome"),
				rs.getString("ult_nome"), rs.getString("senha"));
		return vendedor;
	};

	public void create(Vendedor vendedor) {
		try (Connection conn = ConnectionFactory.createConnection()) {
			CallableStatement stmt = conn.prepareCall("CALL InserirVendedor(?, ?, ?, ?, ?)");

			stmt.setString(1, vendedor.getCpfVendedor());
			stmt.setString(2, vendedor.getPrimeiroNome());
			stmt.setString(3, vendedor.getUltimoNome());
			stmt.setString(4, vendedor.getSenha());

			stmt.registerOutParameter(5, Types.VARCHAR);

			stmt.execute();

			String cpfNovo = (String) stmt.getObject(5);
			log.info("Vendedor novo {}", cpfNovo);
			conn.close();

		} catch (SQLException e) {
			log.info("Vendedor não foi inserido no banco de dados.");
		}
	}

	public List<Vendedor> read() {
		List<Vendedor> vendedores = null;

		try {
			String sql = "SELECT * FROM vendedor";
			vendedores = jdbcTemplate.query(sql, rowMapper);
			if (vendedores.isEmpty())
				log.info("Não há vendedores cadastrados.");

		} catch (Exception e) {
			log.info("Não há vendedores cadastrados.");
		}

		return vendedores;
	}

	public void update(Vendedor vendedor, String cpf) {
		try (Connection conn = ConnectionFactory.createConnection()) {
			CallableStatement stmt = conn.prepareCall("CALL AtualizarVendedor(?, ?, ?, ?)");

			stmt.setString(1, vendedor.getCpfVendedor());
			stmt.setString(2, vendedor.getPrimeiroNome());
			stmt.setString(3, vendedor.getUltimoNome());
			stmt.setString(4, vendedor.getSenha());

			stmt.execute();

			log.info("Vendedor {} atualizado no banco de dados.", vendedor.getCpfVendedor());
			conn.close();
		} catch (SQLException e) {
			log.info("Vendedor não encontrado.");
			e.printStackTrace();
		}
	}

	public void delete(String cpf) {
		String sql = "DELETE FROM vendedor WHERE cpf_vendedor = ?";
		int delete = jdbcTemplate.update(sql, cpf);
		if (delete == 1) {
			log.info("Vendedor {} foi removido do banco de dados.", cpf);
		}
	}

	public Optional<Vendedor> selectByCpf(String cpf) {
		String sql = "SELECT * FROM ConsultarVendedorPorCPF(?)";
		Vendedor vendedor = null;

		try {
			vendedor = jdbcTemplate.queryForObject(sql, rowMapper, cpf);
			log.info("Vendedor {} encontrado no banco de dados.", vendedor.getCpfVendedor());

		} catch (DataAccessException e) {
			log.info("Vendedor não encontrado.");
		}

		return Optional.ofNullable(vendedor);
	}

	public List<Vendedor> selectByString(String s) {
		String sql = "SELECT * FROM vendedor WHERE LOWER(prim_nome) LIKE LOWER('%' || ? || '%') OR LOWER(ult_nome) LIKE LOWER('%' || ? || '%')";
		return jdbcTemplate.query(sql, rowMapper, s, s);
	}

	public Optional<RelatorioVendedor> selectRelatorio(String cpfVendedor, int ano, int mes) {
		String sql = "SELECT * FROM view_relatorio_vendedor WHERE cpf_vendedor = ? AND ano = ? AND mes = ?";
		RelatorioVendedor relatorio = null;

		try (Connection conn = ConnectionFactory.createConnection()) {
			PreparedStatement stmt = conn.prepareStatement(sql);
			
			stmt.setString(1, cpfVendedor);
			stmt.setShort(2, (short) ano);
			stmt.setShort(3, (short) mes);
			BeanPropertyRowMapper<RelatorioVendedor> rs = new BeanPropertyRowMapper<>(RelatorioVendedor.class);
			
			 try (rs = stmt.executeQuery()) {
		            if (rs.next()) {
		                relatorio = new RelatorioVendedor();
		                relatorio.setField1(rs.getString("field1"));
		                relatorio.setField2(rs.getInt("field2"));
		            }
		        }
			
			log.info("Relatório encontrado.");
			conn.close();
			return Optional.ofNullable(relatorio);
			
		} catch (SQLException e) {
			log.info("Relatório do mês {} e ano {}, do vendedor {}, não foi encontrado no banco de dados.", mes, ano,
					cpfVendedor);
			return Optional.empty();
		}
	}

}
