package com.hatertruck.RedeBaratto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hatertruck.RedeBaratto.dao.CompraJdbcDao;
import com.hatertruck.RedeBaratto.model.Compra;

@RestController
@RequestMapping("/compra")
public class CompraController {

    private final CompraJdbcDao compraJdbcDao;

    @Autowired
    public CompraController(CompraJdbcDao compraJdbcDao) {
        this.compraJdbcDao = compraJdbcDao;
    }

    @ResponseBody
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarCompra(@RequestBody Compra compra) {
        compraJdbcDao.create(compra);
        return ResponseEntity.status(HttpStatus.CREATED).body("Compra registrada com sucesso.");
    }

    @ResponseBody
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Compra> listarCompras() {
        return compraJdbcDao.read();
    }

    @ResponseBody
    @GetMapping("/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Compra> pegarCompra(@PathVariable int idCompra) {
        Optional<Compra> compra = compraJdbcDao.selectById(idCompra);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @ResponseBody
    @PutMapping("/atualizar/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> atualizarCompra(@PathVariable int idCompra, @RequestBody Compra compraAtualizada) {
        compraJdbcDao.update(compraAtualizada, idCompra);
        return ResponseEntity.ok("Compra atualizada com sucesso.");
    }

    @DeleteMapping("/deletar/{idCompra}")
    public ResponseEntity<String> deletarCompra(@PathVariable int idCompra) {
        compraJdbcDao.delete(idCompra);
        return ResponseEntity.ok("Compra removida com sucesso.");
    }
    
    @ResponseBody
    @GetMapping("/listar/{cpfCliente}")
    @ResponseStatus(HttpStatus.OK)
    public List<Compra> listarComprasPorCliente(@PathVariable String cpfCliente) {
        return compraJdbcDao.selectByString(cpfCliente);
    }

    @ResponseBody
    @GetMapping("/vendedor/{cpfVendedor}")
    @ResponseStatus(HttpStatus.OK)
    public List<Compra> listarComprasPorVendedor(@PathVariable String cpfVendedor) {
        return compraJdbcDao.selectByVendedor(cpfVendedor);
    }
}
