package com.hatertruck.RedeBaratto.dao;

import com.hatertruck.RedeBaratto.model.CompraProduto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

@Component
public class CompraProdutoJdbcDao implements DAO<CompraProduto>{
    private static final Logger log = LoggerFactory.getLogger(CompraProdutoJdbcDao.class);
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CompraProdutoJdbcDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    RowMapper<CompraProduto> rowMapper = (rs, rowNum) -> {
        CompraProduto compraProduto = new CompraProduto();
        compraProduto.setIdCompra(rs.getInt("id_compra"));
        compraProduto.setIdProduto(rs.getInt("id_produto"));
        compraProduto.setQuantidade(rs.getInt("qtd_produto"));
        return compraProduto;
    };

    @Override
    public void create(CompraProduto compraProduto) {
        String sql = "INSERT INTO compra_produto(id_compra, id_produto, qtd_produto) VALUES (?, ?, ?)";
        try {
            int insert = jdbcTemplate.update(sql, compraProduto.getIdCompra(), compraProduto.getIdProduto() ,compraProduto.getQuantidade());
            if (insert == 1) {
                log.info(String.format("Carrinho (%s) adicionado no banco de dados.", compraProduto.getIdCompra()));
            }
        } catch(Exception e) {
            log.info(("Carrinho não foi adicionado no banco de dados. "));
            e.printStackTrace();
        }
    }

    @Override
    public List<CompraProduto> read() {
        String sql = "SELECT * FROM compra_produto";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<CompraProduto> getCarrinho(int id_compra) {
        String sql = "SELECT * FROM compra_produto WHERE id_compra = ?";
        return jdbcTemplate.query(sql, rowMapper, id_compra);
    }

    @Override
    public void update(CompraProduto compraProduto, int id_compra_produto) {
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
    public Optional<CompraProduto> selectById(int id) {
        return Optional.empty();
    }

    @Override
    public List<CompraProduto> selectByString(String s) {
        return null;
    }
}
