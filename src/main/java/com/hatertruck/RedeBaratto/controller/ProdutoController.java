package com.hatertruck.RedeBaratto.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.hatertruck.RedeBaratto.dao.ProdutoJdbcDao;
import com.hatertruck.RedeBaratto.model.Produto;

@Controller
@RequestMapping("/produto")
public class ProdutoController {

	@Autowired
    private ProdutoJdbcDao produtoDAO;

	@ResponseBody
	@PostMapping("/cadastrar")
	@ResponseStatus(HttpStatus.CREATED)
    public void cadastrarProduto(@RequestBody Produto produto) {
        produtoDAO.create(produto);
    }

	@ResponseBody
	@GetMapping("/listar")
	@ResponseStatus(HttpStatus.OK)
    public List<Produto> listarProdutos() {
        return produtoDAO.read();
    }

	@ResponseBody
	@PutMapping("/atualizar/{idProduto}")
	@ResponseStatus(HttpStatus.OK)
    public void atualizarProduto(@PathVariable Integer idProduto, @RequestBody Produto produtoAtualizado) {
        produtoAtualizado.setIdProduto(idProduto);
        produtoDAO.update(produtoAtualizado, produtoAtualizado.getIdProduto());
    }

	@ResponseBody
	@DeleteMapping("/deletar/{idProduto}")
	@ResponseStatus(HttpStatus.OK)
    public void deletarProduto(@PathVariable Integer idProduto) {
        produtoDAO.delete(idProduto);
    }

	@ResponseBody
	@GetMapping("/listar/{nome}")
	@ResponseStatus(HttpStatus.OK)
    public List<Produto> listarProdutosPorNome(@PathVariable String nome) {
        return produtoDAO.selectByString(nome);
    }

	@ResponseBody
	@GetMapping("/{idProduto}")
	@ResponseStatus(HttpStatus.OK)
    public Optional<Produto> pegarProduto(@PathVariable Integer idProduto) {
        return produtoDAO.selectById(idProduto);
    }

    @ResponseBody
    @GetMapping("/preco/{min}/{max}")
    @ResponseStatus(HttpStatus.OK)
    public List<Produto> listarFaixaPreco(@PathVariable String min, @PathVariable String max) {
        System.out.println(min);
        float minNumber = Float.parseFloat(min);
        float maxNumber = Float.parseFloat(max);
        return produtoDAO.selectAllByPreco(minNumber, maxNumber);
    }

    @ResponseBody
    @GetMapping("/categoria/{categoria}")
    @ResponseStatus(HttpStatus.OK)
    public List<Produto> listarCategoria(@PathVariable String categoria) {
        return produtoDAO.selectAllCategoria(Produto.CategoriaProduto.valueOf(categoria));
    }

    @ResponseBody
    @GetMapping("/mari")
    @ResponseStatus(HttpStatus.OK)
    public List<Produto> listarFabMari() {
        return produtoDAO.selectAllFabricadoEmMari();
    }

    @ResponseBody
    @GetMapping("/estoque-baixo")
    @ResponseStatus(HttpStatus.OK)
    public List<Produto> listarEstoqueBaixo() {
        return produtoDAO.selectAllPoucoEstoque();
    }
}