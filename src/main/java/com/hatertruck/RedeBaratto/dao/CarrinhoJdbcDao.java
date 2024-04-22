package com.hatertruck.RedeBaratto.dao;

import com.hatertruck.RedeBaratto.model.Carrinho;
import com.hatertruck.RedeBaratto.model.Produto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CarrinhoJdbcDao implements DAO<Carrinho>{
    private static final Logger log = LoggerFactory.getLogger(Carrinho.class);
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CarrinhoJdbcDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    RowMapper<Carrinho> rowMapper = (rs, rowNum) -> {
        Carrinho carrinho = new Carrinho();
        carrinho.setIdCompra(rs.getInt("id_compra"));
        carrinho.setIdProduto(rs.getInt("id_produto"));
        carrinho.setQuantidade(rs.getInt("qtd_produto"));
        return carrinho;
    };

    @Override
    public void create(Carrinho carrinho) {
        String sql = "INSERT INTO compra_produto(id_compra, id_produto, qtd_produto) VALUES (?, ?, ?)";

        ProdutoJdbcDao produtoJdbcDao = new ProdutoJdbcDao(jdbcTemplate);
        Produto produto = produtoJdbcDao.selectById(carrinho.getIdProduto()).get();
        produto.setQtdProduto(produto.getQtdProduto() - carrinho.getQuantidade());
        produtoJdbcDao.update(produto, carrinho.getIdProduto());

        try {
            int insert = jdbcTemplate.update(sql, carrinho.getIdCompra(), carrinho.getIdProduto() ,carrinho.getQuantidade());
            if (insert == 1) {
                log.info(String.format("Carrinho.java (%s) adicionado no banco de dados.", carrinho.getIdCompra()));
            }
        } catch(Exception e) {
            log.info(("Carrinho.java não foi adicionado no banco de dados. "));
            e.printStackTrace();
        }
    }

    @Override
    public List<Carrinho> read() {
        String sql = "SELECT * FROM compra_produto";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Carrinho> getCarrinho(int id_compra) {
        String sql = "SELECT * FROM compra_produto WHERE id_compra = ?";
        return jdbcTemplate.query(sql, rowMapper, id_compra);
    }

    @Override
    public void update(Carrinho carrinho, int id_compra_produto) {
    }

    @Override
    public void delete(int id_compra_produto) {
        String sql = "DELETE FROM compra_produto WHERE id_compra = ?";
        int delete = jdbcTemplate.update(sql, id_compra_produto);

        if (delete == 1) {
            log.info(String.format("Compra de id (%s) foi removido do banco de dados.", id_compra_produto));
        } else {
            log.info("Compra nao encontrado.");
        }

    }

    @Override
    public Optional<Carrinho> selectById(int id) {
        return Optional.empty();
    }

    @Override
    public List<Carrinho> selectByString(String s) {
        return null;
    }
}
