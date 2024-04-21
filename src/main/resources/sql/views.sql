DROP VIEW IF EXISTS view_produto;
CREATE VIEW view_produto AS 
  SELECT nome, preco, categoria, fab_Mari FROM produto;

DROP VIEW IF EXISTS view_repor_produto;
CREATE VIEW view_repor_produto AS 
  SELECT p.nome, p.categoria, p.qtd_produto FROM produto p;

DROP VIEW IF EXISTS view_relatorio_vendedor;
CREATE VIEW view_relatorio_vendedor AS
  SELECT 
    id_compra_produto,
    cpf_cliente,
    metodo_pgmt,
    dia,
    mes,
    ano,
    SUM(valor_total) AS valor_total_vendido_mes
  FROM compra
  WHERE status_pago = TRUE 
  GROUP BY cpf_vendedor, mes, ano;
