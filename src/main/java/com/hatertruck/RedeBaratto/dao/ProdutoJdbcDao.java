package com.hatertruck.RedeBaratto.dao;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.hatertruck.RedeBaratto.model.Produto;
import com.hatertruck.RedeBaratto.model.Produto.CategoriaProduto;

/* Classe Produto Data Access Object
*  responsavel por transformar os 
*  objetos em dados para o banco 
*  de dados
*/

@Component
public class ProdutoJdbcDao implements DAO<Produto> {

	private static final Logger log = LoggerFactory.getLogger(ProdutoJdbcDao.class);
	private final JdbcTemplate jdbcTemplate;

	public ProdutoJdbcDao(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	RowMapper<Produto> rowMapper = (rs, rowNum) -> {
		Produto produto = new Produto();
		produto.setIdProduto(rs.getInt("id_produto"));
		produto.setNome(rs.getString("nome"));
		produto.setPreco(rs.getFloat("preco"));
		produto.setCategoria(Produto.CategoriaProduto.valueOf(rs.getString("categoria").toUpperCase()));
		produto.setfab_mari(rs.getBoolean("fab_mari"));
		produto.setQtd_produto(rs.getInt("qtd_produto"));
		return produto;
	};

	@Override
	public void create(Produto produto) {
		String sql = "INSERT INTO produto(nome, preco, categoria, fab_mari, qtd_produto) VALUES (?, ?, ?::categoria_type, ?, ?)";
		try {
			int insert = jdbcTemplate.update(sql, produto.getNome(), produto.getPreco(), produto.getCategoria().name().toLowerCase(),
					produto.isfab_mari(), produto.getQtd_produto());
			if (insert == 1) {
				log.info(String.format("Produto (%s) adicionado no banco de dados.", produto.getNome()));
			}
		} catch(Exception e) {
			log.info(String.format("Produto não foi adicionado no banco de dados."));
		}
	}

	@Override
	public List<Produto> read() {
		String sql = "SELECT * FROM produto";
		return jdbcTemplate.query(sql, rowMapper);
	}

	@Override
	public void update(Produto produto, int id_produto) {
		String sql = "UPDATE produto SET nome = ?, preco = ?, categoria = ?::categoria_type, fab_mari = ?,  qtd_produto = ? WHERE id_produto = ?";
		int update = jdbcTemplate.update(sql, produto.getNome(), produto.getPreco(), produto.getCategoria().name().toLowerCase(),
				produto.isfab_mari(), produto.getQtd_produto(), id_produto);

		if (update == 1) {
			log.info(String.format("Produto (%s) atualizado no banco de dados.", produto.getNome()));
		} else {
			log.info(String.format("Produto nao encontrado."));
		}
	}

	@Override
	public void delete(int id_produto) {
		String sql = "DELETE FROM produto WHERE id_produto = ?";
		int delete = jdbcTemplate.update(sql, id_produto);

		if (delete == 1) {
			log.info(String.format("Produto de id (%s) foi removido do banco de dados.", id_produto));
		} else {
			log.info("Produto nao encontrado.");
		}
	}

	@Override
	public List<Produto> selectByString(String nome) {
		String sql = "SELECT * FROM produto WHERE LOWER(nome) LIKE LOWER('%' || ? || '%')";
		return jdbcTemplate.query(sql, rowMapper, nome);
	}

	@Override
	public Optional<Produto> selectById(int id_produto) {
		String sql = "SELECT id_produto, nome, preco, categoria, fab_mari, qtd_produto FROM produto WHERE id_produto = ?";
		Produto produto = null;

		try {
			produto = jdbcTemplate.queryForObject(sql, rowMapper, id_produto);

		} catch (DataAccessException e) {
			log.info("Produto não encontrado.");
		}

		return Optional.ofNullable(produto);
	}
	
	public List<Produto> selectAllByPreco(float precoMinimo, float precoMaximo) {
		String sql = "SELECT * FROM produto WHERE preco BETWEEN ? AND ?";
        return jdbcTemplate.query(sql, rowMapper, precoMinimo, precoMaximo);
	}
	
	public List<Produto> selectAllCategoria(CategoriaProduto categoria) {
		String sql = "SELECT * FROM produto WHERE categoria = ?::categoria_type";
		return jdbcTemplate.query(sql, rowMapper, categoria.name().toLowerCase());
	}
	
	public List<Produto> selectAllFabricadoEmMari() {
		String sql = "SELECT * FROM produto WHERE fab_mari = true";
        return jdbcTemplate.query(sql, rowMapper);
	}
	
	public List<Produto> selectAllPoucoEstoque() {
		String sql = "SELECT * FROM produto WHERE qtd_produto < 5";
        return jdbcTemplate.query(sql, rowMapper);
	}
}