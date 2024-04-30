package com.hatertruck.RedeBaratto.dao;

import com.hatertruck.RedeBaratto.factory.ConnectionFactory;
import com.hatertruck.RedeBaratto.model.Compra;
import com.hatertruck.RedeBaratto.model.RelatorioVendedor;
import com.hatertruck.RedeBaratto.model.Vendedor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;
import java.util.Optional;

@Component
public class VendedorJdbc {

    private static final Logger log = LoggerFactory.getLogger(VendedorJdbc.class);
    private final JdbcTemplate jdbcTemplate;

    public VendedorJdbc(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    RowMapper<Vendedor> rowMapper = (rs, rowNum) -> {
        return new Vendedor(rs.getString("cpf_vendedor"), rs.getString("prim_nome"),
                rs.getString("ult_nome"), rs.getString("senha"));
    };

    RowMapper<Compra> compraRowMapper = (rs, rowNum) -> {
        return new Compra(
                rs.getInt("id_compra"),
                rs.getString("cpf_cliente"),
                rs.getString("cpf_vendedor"),
                rs.getInt("dia"),
                rs.getInt("mes"),
                rs.getInt("ano"),
                Compra.MetodoPagamento.valueOf(rs.getString("metodo_pgmt").toUpperCase()),
                rs.getBoolean("status_pago"),
                rs.getFloat("valor_total_vendido_mes"));
    };

    RowMapper<RelatorioVendedor> relatorioRowMapper = (rs, rowNum) -> {
        return new RelatorioVendedor(
                rs.getString("cpf_vendedor"),
                rs.getFloat("valor_total_vendido_mes"),
                rs.getInt("mes"),
                rs.getInt("ano"));
    };

    public void create(@org.jetbrains.annotations.NotNull Vendedor vendedor) {
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

            stmt.setString(1, cpf);
            stmt.setString(2, vendedor.getPrimeiroNome());
            stmt.setString(3, vendedor.getUltimoNome());
            stmt.setString(4, vendedor.getSenha());

            stmt.execute();

            log.info("Vendedor {} atualizado no banco de dados.", vendedor.getCpfVendedor());

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
        String sql = "SELECT * FROM view_relatorio_vendedores WHERE cpf_cliente = ? )";
        return jdbcTemplate.query(sql, rowMapper, s);
    }

    public List<RelatorioVendedor> selectRelatorioVendas(String cpfVendedor) {
        String sql = "SELECT * FROM view_relatorio_vendedores WHERE cpf_vendedor = ?";
        List<RelatorioVendedor> relatorios = jdbcTemplate.query(sql, relatorioRowMapper, cpfVendedor);

        if (relatorios.isEmpty()) {
            log.info("Relatório do mês {} e ano {}, do vendedor {}, não foi encontrado no banco de dados.", cpfVendedor);
        } else {
            log.info("Relatório encontrado.");
        }
        return relatorios;
    }

    public List<RelatorioVendedor> selectRelatorioVendas(String cpfVendedor, int ano, int mes) {
        String sql = "SELECT * FROM view_relatorio_vendedores" +
                " WHERE cpf_vendedor = ? AND ano = ? AND mes = ?";
        List<RelatorioVendedor> relatorios = jdbcTemplate.query(sql, relatorioRowMapper, cpfVendedor, ano, mes);

        if (relatorios.isEmpty()) {
            log.info("Relatório do mês {} e ano {}, do vendedor {}, não foi encontrado no banco de dados.", mes, ano, cpfVendedor);
        } else {
            log.info("Relatório encontrado.");
        }
        return relatorios;
    }
}
