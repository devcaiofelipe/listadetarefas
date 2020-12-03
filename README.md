LISTA DE TAREFAS COM NODEJS
=

Esta é minha lista de tarefas, desenvolvi com intuíto de por em prática meus conhecimentos de programação backend.
Nela você pode cadastrar seu telefone celular(informando DDD, 9 antes e o número), com isso você irá receber um SMS de confirmação para ativar sua conta.
Após confirmar a conta, você ja vai poder começar registar suas tarefas e uma data para que ela seja finalizada.
No dia anterior a data de expiração vai ser enviado um SMS para seu telefone as 9h da manhã para te lembrar que o prazo da tarefa está acabando.
O status das tarefas podem ser alterados para Pendente ou Finalizado.

Testes
=

Escrevi os teste de integração usando a biblioteca jest, está faltando alguns teste que ainda estou finalizando :)

Bibliotecas
=
- Express -> para tratar as requisições http.
- PostgreSQL -> para armazenar os usuários e as respectivas tarefas.
- Redis -> para fazer cache das tarefas do usuário
- Sqlit3 -> Para rodar os testes automatizados.
- Comtele-sdk -> Para enviar os SMS de confirmação de usuário e lembrete do tempo das tarefas.
- Sequelize -> ORM para realizar as consultas no banco de dados.
- Date-fns -> para manipulação das datas.
- Multer -> Para fazer upload da foto de perfil do usuário.
- Yup -> Para validação de dados de entrada no backend.
- Jimp -> Para redimensionar as fotos de perfil.
- Jsonwebtoken -> Para implementar a autenticação JWT.
- Bcrypt -> Para gerar o hash da senha do usuário.
- ioredis -> como client do redis

Como baixar e usar?
=
- Você pode clonar a aplicação com "https://github.com/devcaiofelipe/todo-list.git"
- Rodar o comando npm install, para instalar todas as dependencias do projeto(Certifique-se de ter o nodejs instalado).
- Rodar o comando npm start, para subir o servidor
- Você vai precisar criar uma conta na Comtele pegar o API_KEY que eles forneçem, e alterar no arquivo ".env" o valor de API_KEY, para a key forneçida por eles.
