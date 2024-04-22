DROP TABLE IF EXISTS cliente;
CREATE TABLE cliente(
  cpf_cliente VARCHAR(11) NOT NULL,
  prim_nome VARCHAR(20) NOT NULL,
  ult_nome VARCHAR(30) NOT NULL,
  senha VARCHAR(100) NOT NULL,
  is_flamengo BOOLEAN,
  one_piece_fan BOOLEAN,
  sousense BOOLEAN,
  CONSTRAINT cpf_cliente_pk PRIMARY KEY (cpf_cliente)
);

DROP TABLE IF EXISTS vendedor;
CREATE TABLE vendedor(
  cpf_vendedor VARCHAR(11) NOT NULL,
  prim_nome VARCHAR(20) NOT NULL,
  ult_nome VARCHAR(30) NOT NULL,
  senha VARCHAR(100) NOT NULL, 
  CONSTRAINT cpf_vendedor_pk PRIMARY KEY (cpf_vendedor)
);

DROP TABLE IF EXISTS produto;
CREATE TABLE produto(
  id_produto SERIAL NOT NULL,
  nome VARCHAR(50) NOT NULL UNIQUE,
  preco DECIMAL(10,2) NOT NULL,
  categoria categoria_type NOT NULL,
  fab_Mari BOOLEAN,
  qtd_produto INT NOT NULL DEFAULT 1,
  CONSTRAINT id_produto_pk PRIMARY KEY(id_produto)
);

DROP TABLE IF EXISTS COMPR;
CREATE TABLE compra(
  id_compra SERIAL NOT NULL,
  cpf_cliente VARCHAR(11) NOT NULL,
  cpf_vendedor VARCHAR(11) NOT NULL,
  dia SMALLINT,
  mes SMALLINT,
  ano SMALLINT,
  metodo_pgmt pagamento_type NOT NULL DEFAULT 'berries',
  status_pago BOOLEAN NOT NULL DEFAULT FALSE,
  valor_total DECIMAL(10, 2),
  CONSTRAINT id_compra_pk PRIMARY KEY(id_compra),
  CONSTRAINT cpf_vendedor_fk FOREIGN KEY(cpf_vendedor) REFERENCES vendedor(cpf_vendedor) ON DELETE CASCADE,
  CONSTRAINT cpf_cliente_fk FOREIGN KEY(cpf_cliente) REFERENCES cliente(cpf_cliente) ON DELETE CASCADE
);

DROP TABLE IF EXISTS carrinho;
CREATE TABLE carrinho(
  id_compra INT NOT NULL, 
  id_produto INT NOT NULL,
  qtd_produto INT NOT NULL DEFAULT 1,
  CONSTRAINT compra_fk FOREIGN KEY(id_compra) REFERENCES compra(id_compra) ON DELETE CASCADE,
  CONSTRAINT produto_fk FOREIGN KEY(id_produto) REFERENCES produto(id_produto) ON DELETE CASCADE
);
