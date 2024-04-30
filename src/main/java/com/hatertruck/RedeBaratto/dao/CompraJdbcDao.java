package com.hatertruck.RedeBaratto.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.hatertruck.RedeBaratto.factory.ConnectionFactory;
import com.hatertruck.RedeBaratto.model.Compra;
import com.hatertruck.RedeBaratto.model.Compra.MetodoPagamento;

@Component
public class CompraJdbcDao implements DAO<Compra> {

	private static final Logger log = LoggerFactory.getLogger(ClienteJdbc.class);
	private final JdbcTemplate jdbcTemplate;

	@Autowired
	public CompraJdbcDao(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	RowMapper<Compra> rowMapper = (rs, rowNum) -> {
		return new Compra(
				rs.getInt("id_compra"), 
				rs.getString("cpf_cliente"), 
				rs.getString("cpf_vendedor"),
				rs.getInt("dia"), 
				rs.getInt("mes"), 
				rs.getInt("ano"),
				MetodoPagamento.valueOf(rs.getString("metodo_pgmt").toUpperCase()), 
				rs.getBoolean("status_pago"),
				rs.getFloat("valor_total"));
	};

	@Override
	public void create(Compra compra) {
		int idCompra = 0;
		try (Connection conn = ConnectionFactory.createConnection()) {
			CallableStatement statement = conn.prepareCall(
					"{ ? = call CriarCompraFunc(?, ?, ?::SMALLINT, ?::SMALLINT, ?::SMALLINT, ?::pagamento_type, ?::BOOLEAN, ?::DECIMAL) }");

			statement.registerOutParameter(1, java.sql.Types.INTEGER);

			statement.registerOutParameter(1, java.sql.Types.INTEGER);
			statement.setString(2, compra.getCpfCliente());
			statement.setString(3, compra.getCpfVendedor());
			statement.setInt(4, compra.getDia());
			statement.setInt(5, compra.getMes());
			statement.setInt(6, compra.getAno());
			statement.setString(7, compra.getMetodoPagamento().name().toLowerCase());
			statement.setBoolean(8, compra.getStatus());
			statement.setFloat(9, compra.getValorTotal());

			statement.execute();

			idCompra = statement.getInt(1);
			log.info("Compra registrada {}", idCompra);

		} catch (SQLException e) {
			log.info("A compra não foi efetuada {}", e.getMessage());
		}
	}

	@Override
	public List<Compra> read() {
		List<Compra> compras = new ArrayList<>();
		String query = "SELECT * FROM compra";

		try {
			compras = jdbcTemplate.query(query, rowMapper);
			if (compras.isEmpty())
				log.info("Não há compras cadastradas.");

		} catch (Exception e) {
			log.info("Não foi possível retornar as compras.");
		}
		return compras;
	}

	@Override
	public Optional<Compra> selectById(int idCompra) {
		Compra compra = null;
		String query = "SELECT * FROM compra WHERE id_compra = ?";
		try {
			compra = jdbcTemplate.queryForObject(query, rowMapper, idCompra);
			if (compra != null) {
				log.info("Compra recuperada {}.", compra.getIdCompra());
			}
		} catch (Exception e) {
			log.info("Compra não encontrada.");
		}
		return Optional.ofNullable(compra);
	}

	@Override
	public void update(Compra compra, int idCompra) {
		String query = "UPDATE compra SET id_compra = ?, cpf_cliente = ?, cpf_vendedor =?, dia = ?, mes = ?, ano = ?, metodo_pgmt = ?::pagamento_type, status_pago = ?, valor_total =? WHERE id_compra = ?";
		int update = jdbcTemplate.update(query, idCompra, compra.getCpfCliente(), compra.getCpfVendedor(),
				compra.getDia(), compra.getMes(), compra.getAno(),
				String.valueOf(compra.getMetodoPagamento()).toLowerCase(),
				String.valueOf(compra.getStatus()).toLowerCase(), compra.getValorTotal(), idCompra);

		if (update == 1) {
			log.info(String.format("Compra (%s) atualizada no banco de dados.", compra.getIdCompra()));
		} else {
			log.info(String.format("Compra não atualizada."));
		}
	}

	@Override
	public void delete(int idProduto) {
		String query = "DELETE FROM compra WHERE id_compra = ?";

		try {
			int delete = jdbcTemplate.update(query, idProduto);
			if (delete == 1)
				log.info("Compra {} foi removida do banco de dados.", idProduto);

		} catch (DataAccessException e) {
			log.info("Compra não encontrada.");
		}
	}

	@Override
	public List<Compra> selectByString(String cpfCliente) {
		String sql = "SELECT * FROM compra WHERE cpf_cliente = ?";
		return jdbcTemplate.query(sql, rowMapper, cpfCliente);
	}

    public List<Compra> selectByVendedor(String cpfVendedor) {
		String sql = "SELECT * FROM compra WHERE cpf_vendedor = ?";
		return jdbcTemplate.query(sql, rowMapper, cpfVendedor);
    }
}
