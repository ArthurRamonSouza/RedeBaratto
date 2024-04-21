DROP VIEW IF EXISTS view_produto;
CREATE VIEW view_produto AS 
  SELECT nome, preco, categoria, fab_Mari FROM produto;

CREATE VIEW view_repor_produto AS 
  SELECT p.nome, p.categoria, p.qtd_produto FROM produto p;

CREATE OR REPLACE VIEW view_relatorio_vendedor AS
  SELECT 
    cpf_vendedor,
    mes,
    ano,
    SUM(valor_total) AS valor_total_vendido_mes
  FROM compra
  WHERE status_pago = TRUE 
  GROUP BY cpf_vendedor, mes, ano;
