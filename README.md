# AppFinancas-Backend

## RESTful API que está fornece dados para a aplicação: https://appfinancas-sable.vercel.app/ ##
## Endereco da API: https://app-financas-server.onrender.com/

API em padrão REST que se conecta com o banco de dados PostgreSQL também criado por mim. A API permite:

- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 
- Obter extrato de transações 
- Filtrar transações por categoria 

## Todas as rotas após a de Login são protegidas por um token de autenticação que é gerado após o login do usuário. ##
## Todas os modelos de requisições estão disponíveis no arquivo JSON na raíz do projeto ##
