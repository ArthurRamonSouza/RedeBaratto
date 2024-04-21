package com.hatertruck.RedeBaratto.controller;
import java.util.List;
import java.util.Optional;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.hatertruck.RedeBaratto.dao.CompraProdutoJdbcDao;
import com.hatertruck.RedeBaratto.model.CompraProduto;

@Controller
@RequestMapping("/carrinho")
public class CompraProdutoController {
    private final CompraProdutoJdbcDao compraProdutoJdbcDao;

    @Autowired
    public CompraProdutoController(CompraProdutoJdbcDao compraProdutoJdbcDao) {
        this.compraProdutoJdbcDao = compraProdutoJdbcDao;
    }

    @ResponseBody
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarCompra(@RequestBody CompraProduto compraProduto) {
        compraProdutoJdbcDao.create(compraProduto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Item registrado no carrinho.");
    }

    @ResponseBody
    @GetMapping("/listar/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public List<CompraProduto> listarCompras(@PathVariable int idCompra) {
        return compraProdutoJdbcDao.getCarrinho(idCompra);
    }

    @ResponseBody
    @GetMapping("/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CompraProduto> pegarCompra(@PathVariable int idCompra) {
        Optional<CompraProduto> compra = compraProdutoJdbcDao.selectById(idCompra);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletar/{idCompra}")
    public ResponseEntity<String> deletarCompra(@PathVariable int idCompra) {
        compraProdutoJdbcDao.delete(idCompra);
        return ResponseEntity.ok("Item removido do carrinho com sucesso.");
    }

}
