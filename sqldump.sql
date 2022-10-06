create database dindin

create table usuarios(id serial primary key, nome text not null, email text unique not null, senha text not null)


create table categorias (id serial primary key, descricao text not null)

create table transacoes(id serial primary key,
                        descricao text not null,
                        valor int not null,
                        data timestamp,
                        categoria_id int references categorias(id),
                        usuario_id int references usuarios(id),
                        tipo text not null)
                        
insert into categorias (descricao)
values('Alimentação'),
('Assinatura e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saúde'),
('Transporte'),
('Salário'),
('Vendas'),
('Outras Receitas'),
('Outras Despesas')