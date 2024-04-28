package com.hatertruck.RedeBaratto.controller;
import java.util.List;
import java.util.Optional;

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

import com.hatertruck.RedeBaratto.dao.CarrinhoJdbcDao;
import com.hatertruck.RedeBaratto.model.Carrinho;

@Controller
@RequestMapping("/carrinho")
public class CarrinhoController {
    private final CarrinhoJdbcDao carrinhoJdbcDao;

    @Autowired
    public CarrinhoController(CarrinhoJdbcDao carrinhoJdbcDao) {
        this.carrinhoJdbcDao = carrinhoJdbcDao;
    }

    @ResponseBody
    @PostMapping("/cadastrar")
    public ResponseEntity<String> cadastrarCompra(@RequestBody Carrinho carrinho) {
        carrinhoJdbcDao.create(carrinho);
        return ResponseEntity.status(HttpStatus.CREATED).body("Item registrado no carrinho.");
    }

    @ResponseBody
    @GetMapping("/listar/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public List<Carrinho> listarCompras(@PathVariable int idCompra) {
        return carrinhoJdbcDao.getCarrinho(idCompra);
    }

    @ResponseBody
    @GetMapping("/{idCompra}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Carrinho> pegarCompra(@PathVariable int idCompra) {
        Optional<Carrinho> compra = carrinhoJdbcDao.selectById(idCompra);
        return compra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deletar/{idCompra}/{idProduto}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deletarItem(@PathVariable int idCompra, @PathVariable int idProduto) {
        carrinhoJdbcDao.delete(idCompra, idProduto);
        return ResponseEntity.ok("Item removido do carrinho com sucesso.");
    }

}
