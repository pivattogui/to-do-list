# Sistema de Lista de Tarefas
Este projeto foi desenvolvido com o objetivo de servir de estudo e prática de deploy utilizando um banco de dados. O sistema consiste em uma lista de tarefas com descrições personalizadas, onde tais são guardadas na conta do usuário dentro do banco de dados.

### Tecnologias utilizadas
- **Next.JS** para implementação de interfaces e API
- **Vercel** para deploy
- **PlanetScale** para gerenciamento do banco de dados
   
---

### Next.js

O projeto utiliza o Next.js como tecnologia de interface e API ao mesmo tempo

#### Interface

Para rodar o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador e tudo deve estar funcionando.
Você pode encontrar os arquivos que compoem as paginas no diretório `pages`.

### MySQL

O projeto utiliza o banco de dados relacional MySQL. Em produção, utilizamos a plataforma PlanetScale para manejar a escalabilidade. Para desenvolvimento, podemos executar um servidor local.

#### Docker

O Hub disponibiliza uma [imagem Docker oficial](https://hub.docker.com/_/mysql) do MySQL.
Para puxarmos a imagem podemos executar:

```docker
docker pull mysql
```

Para rodar a instancia:

```docker
docker run -d -p 3306:3306 --name to-do-list-db -e MYSQL_ROOT_PASSWORD=dev -e MYSQL_DATABASE=db mysql:latest
```

Se tudo ocorreu como esperado, você deve ter iniciado uma instancia Docker com o nome `to-do-list-db` na porta 3306 - ele vai ser usado como nosso servidor MySQL local.

#### Gerar

O comando `generate` lê todas as informações acima mencionadas do esquema para gerar o código fonte de dados do cliente (Prisma Client).

```bash
npx prisma generate
```

---

#### Conta para teste
   - email: teste@teste.com
   - senha: teste123
