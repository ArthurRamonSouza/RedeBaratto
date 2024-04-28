package com.hatertruck.RedeBaratto.dao;

import com.hatertruck.RedeBaratto.model.Carrinho;
import com.hatertruck.RedeBaratto.model.Produto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import java.util.List;
import java.util.Optional;

@Component
public class CarrinhoJdbcDao implements DAO<Carrinho> {
    private static final Logger log = LoggerFactory.getLogger(Carrinho.class);
    private final JdbcTemplate jdbcTemplate;
    @Autowired
    PlatformTransactionManager transactionManager;

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
        String insertCarrinhoSql = "INSERT INTO carrinho(id_compra, id_produto, qtd_produto) VALUES (?, ?, ?)";
        String updateProdutoSql = "UPDATE produto SET qtd_produto = qtd_produto - ? WHERE id_produto = ?";

        ProdutoJdbcDao produtoJdbcDao = new ProdutoJdbcDao(jdbcTemplate);

        // Criar uma definição padrão de transação
        DefaultTransactionDefinition transactionDefinition = new DefaultTransactionDefinition();

// Definir as configurações da transação, se necessário
        transactionDefinition.setIsolationLevel(TransactionDefinition.ISOLATION_DEFAULT);
        transactionDefinition.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);

// Iniciar uma nova transação e obter o status
        TransactionStatus status = transactionManager.getTransaction(transactionDefinition);

        try {
            // Iniciar transação
            TransactionDefinition def = new DefaultTransactionDefinition();

            // Inserir no carrinho
            jdbcTemplate.update(insertCarrinhoSql, carrinho.getIdCompra(), carrinho.getIdProduto(), carrinho.getQuantidade());

            // Atualizar quantidade do produto
            Produto produto = produtoJdbcDao.selectById(carrinho.getIdProduto()).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
            int quantidadeParaAtualizar = carrinho.getQuantidade();
            if (produto.getQtdProduto() < quantidadeParaAtualizar) {
                throw new RuntimeException("Quantidade insuficiente de produto");
            }
            jdbcTemplate.update(updateProdutoSql, quantidadeParaAtualizar, carrinho.getIdProduto());

            // Commit da transação
            transactionManager.commit(status);
            log.info(String.format("Carrinho (%s) adicionado no banco de dados.", carrinho.getIdCompra()));
        } catch (Exception e) {
            // Rollback da transação em caso de erro
            transactionManager.rollback(status);
            log.error("Erro ao adicionar carrinho no banco de dados", e);
        }
    }

    @Override
    public List<Carrinho> read() {
        String sql = "SELECT * FROM carrinho";
        return jdbcTemplate.query(sql, rowMapper);
    }

    public List<Carrinho> getCarrinho(int id_compra) {
        String sql = "SELECT * FROM carrinho WHERE id_compra = ?";
        return jdbcTemplate.query(sql, rowMapper, id_compra);
    }

    @Override
    public void update(Carrinho carrinho, int id_carrinho) {
    }

    @Override
    public void delete(int id_carrinho) {}

    public void delete(int idCarrinho, int idProduto) {
        String sql = "DELETE FROM carrinho WHERE id_compra = ? and id_produto = ?";
        int delete = jdbcTemplate.update(sql, idCarrinho, idProduto);

        if (delete == 1) {
            log.info(String.format("Item de id (%s) foi removido do carrinho.", idProduto));
        } else {
            log.info("Item nao encontrado.");
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
