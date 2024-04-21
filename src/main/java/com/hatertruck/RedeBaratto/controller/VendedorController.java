package com.hatertruck.RedeBaratto.controller;

import java.util.List;
import java.util.Optional;

import com.hatertruck.RedeBaratto.model.Compra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.hatertruck.RedeBaratto.dao.VendedorJdbc;
import com.hatertruck.RedeBaratto.model.Vendedor;

@Controller
@RequestMapping("/vendedor")
public class VendedorController {

    @Autowired
    private VendedorJdbc vendedorJdbc;

    @ResponseBody
    @PostMapping("/cadastrar")
    public ResponseEntity<String> ceatreVendedor(@RequestBody Vendedor vendedor) {
        vendedorJdbc.create(vendedor);
        return ResponseEntity.status(HttpStatus.CREATED).body("Vendedor registrado com sucesso.");
    }

    @ResponseBody
    @GetMapping("/listar")
    @ResponseStatus(HttpStatus.OK)
    public List<Vendedor> listarVendedores() {
        return vendedorJdbc.read();
    }

    @ResponseBody
    @GetMapping("/{cpfVendedor}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Vendedor> pegarVendedor(@PathVariable String cpfVendedor) {
    	Optional<Vendedor> vendedor = vendedorJdbc.selectByCpf(cpfVendedor);
        return vendedor.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @ResponseBody
    @PutMapping("/atualizar/{cpfVendedor}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> atualizarVendedor(@PathVariable String cpfVendedor, @RequestBody Vendedor vendedorAtualizado) {
        vendedorAtualizado.setCpfVendedor(cpfVendedor);
        vendedorJdbc.update(vendedorAtualizado, cpfVendedor);
        return ResponseEntity.ok("Vendedor atualizado com sucesso.");
    }

    @ResponseBody
    @DeleteMapping("/deletar/{cpfVendedor}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<String> deletarVendedor(@PathVariable String cpfVendedor) {
        vendedorJdbc.delete(cpfVendedor);
        return ResponseEntity.ok("Compra removida com sucesso.");
    }


    @ResponseBody
    @GetMapping("/listar/{nome}")
    @ResponseStatus(HttpStatus.OK)
    public List<Vendedor> listarVendedoresPorNome(@PathVariable String nome) {
        return vendedorJdbc.selectByString(nome);
    }
    
    @ResponseBody
    @GetMapping("/relatorio/{cpfVendedor}/{ano}/{mes}")
    @ResponseStatus(HttpStatus.OK)
    public List<Compra> listarRelatorioVendedor(@PathVariable String cpfVendedor, @PathVariable int ano, @PathVariable int mes) {
        return vendedorJdbc.selectRelatorioVendas(cpfVendedor, ano, mes);
    }
}
