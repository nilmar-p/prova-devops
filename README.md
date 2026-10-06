# Obras de Arte
Participante: Nilmar Pereira

projeto desenvolvido para a avaliação da disciplina de devops

a aplicação cadastra e gerencia obras de arte

## Sumário

* [Estrutura](#estrutura)
* [Dados](#dados)
* [Requisitos](#requisitos)
* [Executando o projeto](#executando-o-projeto)
* [Banco de dados (PostgreSQL)](#banco-de-dados-postgresql)
* [API (NestJS)](#api-nestjs)
* [Endpoints](#endpoints)
* [Exemplos de resposta](#exemplos-de-resposta)
* [Front (React)](#front-react)
* [Derrubando os recursos](#derrubando-os-recursos)
* [GitHub](#github)

## Estrutura

```text
├── api/
├── front/
├── deploy/
└── README.md
```

## Dados

Tabela `artworks`:

| Campo  | Descrição      |
| ------ | -------------- |
| id     | Identificador  |
| title  | Titulo da obra |
| artist | Artista        |
| year   | ano            |
| price  | Preço          |

## Requisitos

* Git
* Docker
* Docker Compose

O Docker precisa estar aberto/rodando antes de executar os comandos.

## Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/nilmar-p/prova-devops.git
cd prova-devops
```

Execute:

```bash
docker compose -f deploy/docker-compose.yml up --build
```

Se quiser rodar em segundo plano, adicione `-d`:

```bash
docker compose -f deploy/docker-compose.yml up -d --build
```

Para ver se subiu certo e acompanhar os logs da api:

```bash
docker compose -f deploy/docker-compose.yml ps
docker compose -f deploy/docker-compose.yml logs -f api
```

Depois de subir, é só acessar:

* Front: http://localhost:3000
* API: http://localhost:3005
* Swagger: http://localhost:3005/swagger

## Banco de dados (PostgreSQL)

O banco sobe pelo compose usando a imagem `postgres:16-alpine`:

| Item | Valor |
| ---- | ----- |
| Usuário | `postgres` |
| Senha | `postgres` |
| Banco | `artworks_db` |
| Porta externa | `5433` (dentro do container é `5432`) |
| Volume | `postgres_data` (guarda os dados) |

Subir só o banco:

```bash
docker compose -f deploy/docker-compose.yml up -d postgres
```

Acessar o banco:

```bash
# por dentro do container
docker exec -it postgres psql -U postgres -d artworks_db

# pela minha máquina (precisa ter o psql instalado)
psql -h localhost -p 5433 -U postgres -d artworks_db
```

Testar se os dados persistem:

```bash
docker exec -it postgres psql -U postgres -d artworks_db -c "CREATE TABLE teste (id int);"
docker compose -f deploy/docker-compose.yml down
docker compose -f deploy/docker-compose.yml up -d postgres
docker exec -it postgres psql -U postgres -d artworks_db -c "\dt"   # a tabela continua lá
```

Ver os volumes:

```bash
docker volume ls
```

### Arquivos de ignore

* `.gitignore` (raiz): não deixa subir `node_modules`, `dist`, `.env`, logs e arquivos do editor.
* `api/.dockerignore` e `front/.dockerignore`: tiram `node_modules`, `.git`, `.env` e logs do build, assim o build fica mais rápido e não leva arquivo com senha.

## API (NestJS)

A api foi feita em NestJS e usa TypeORM para conectar no PostgreSQL. Tem validação nos campos com DTOs (`class-validator`) e o Swagger para testar as rotas.

* Porta: `3005`
* Swagger: http://localhost:3005/swagger
* A tabela `artworks` é criada sozinha quando a api sobe (`synchronize: true`)

### Variáveis de ambiente

Ficam em `api/.env` (tem um exemplo no `api/.env.example`):

```env
PORT=3005
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASS=postgres
POSTGRES_DB=artworks_db
```

Dentro do compose o host do banco é o nome do serviço (`postgres`) e a porta é a `5432`. Se rodar a api fora do Docker, troca para `localhost` e porta `5433`.

### Rodar a api sem o compose

Precisa do postgres rodando antes:

```bash
cd api
npm install --legacy-peer-deps
npm run start:dev
```

### Build da imagem

O compose já faz o build sozinho, mas dá para fazer na mão:

```bash
docker build -t artworks-api ./api
```

### Validações

* `title` e `artist`: texto, obrigatórios, até 255 caracteres
* `year`: número inteiro
* `price`: número maior ou igual a 0
* campos que não existem na tabela são recusados

## Endpoints

| Método | Rota | O que faz | Resposta |
| ------ | ---- | --------- | -------- |
| GET | `/artworks` | lista todas as obras | 200 |
| GET | `/artworks/:id` | busca uma obra | 200 / 404 |
| POST | `/artworks` | cadastra uma obra | 201 / 400 |
| PATCH | `/artworks/:id` | atualiza uma obra | 200 / 404 / 400 |
| DELETE | `/artworks/:id` | remove uma obra | 200 / 404 |

### Exemplo de body (POST)

```json
{
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5000000
}
```

## Exemplos de resposta

Dá para testar pelo Swagger ou pelo `curl`.

**POST /artworks** (201)

```bash
curl -X POST http://localhost:3005/artworks \
  -H "Content-Type: application/json" \
  -d '{"title":"abaporu","artist":"Tarsila do amaral","year":1928,"price":5000000}'
```

```json
{
  "id": 1,
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5000000
}
```

**GET /artworks** (200)

```bash
curl http://localhost:3005/artworks
```

```json
[
  {
    "id": 1,
    "title": "abaporu",
    "artist": "Tarsila do amaral",
    "year": 1928,
    "price": 5000000
  }
]
```

**GET /artworks/1** (200)

```bash
curl http://localhost:3005/artworks/1
```

```json
{
  "id": 1,
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5000000
}
```

**PATCH /artworks/1** (200), enviando só o preço

```bash
curl -X PATCH http://localhost:3005/artworks/1 \
  -H "Content-Type: application/json" \
  -d '{"price":5500000}'
```

```json
{
  "id": 1,
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5500000
}
```

**DELETE /artworks/1** (200)

```bash
curl -X DELETE http://localhost:3005/artworks/1
```

```json
{
  "message": "Artwork removed"
}
```

**GET /artworks/999** (404, não encontrada)

```json
{
  "statusCode": 404,
  "message": "Artwork not found",
  "error": "Not Found"
}
```

**POST com dado errado** (400), por exemplo `"year": "abc"`

```json
{
  "message": ["campo year deve ser um número inteiro"],
  "error": "Bad Request",
  "statusCode": 400
}
```

## Front (React)

O front foi feito em React (com Vite) e mostra uma tabela com todas as obras que vêm do `GET /artworks` da api.

* Porta: `3000` (http://localhost:3000)
* No Docker, o build do React é servido por um nginx

### Como o front fala com a api

O navegador não enxerga o nome `api` da network do Docker, então o front chama o caminho `/api/artworks`. O nginx do container do front pega esse pedido e manda para `http://api:3005/artworks`, usando o DNS interno da network `app-network`:

```text
navegador -> localhost:3000/api/artworks -> nginx (front) -> http://api:3005/artworks
```

Isso fica configurado no arquivo `front/nginx.conf`.

### Ver a tabela funcionando

Com tudo de pé (`docker compose -f deploy/docker-compose.yml up -d --build`), é só abrir http://localhost:3000. Se a tabela aparecer vazia, cadastra uma obra pelo Swagger (http://localhost:3005/swagger) e atualiza a página.

Também dá para testar a comunicação pela network direto no terminal:

```bash
curl http://localhost:3000/api/artworks
```

### Build da imagem

O compose já faz o build sozinho, mas dá para fazer na mão:

```bash
docker build -t artworks-front ./front
```

### Rodar o front sem o compose

Precisa da api rodando na porta 3005:

```bash
cd front
npm install --legacy-peer-deps
npm run dev
```

## Derrubando os recursos

Para parar e remover os containers e a rede:

```bash
docker compose -f deploy/docker-compose.yml down
```

Para remover também o volume do banco (apaga os dados):

```bash
docker compose -f deploy/docker-compose.yml down -v
```

## GitHub

Repositório público contendo as pastas `api`, `front` e `deploy`.
