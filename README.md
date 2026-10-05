# Obras de Arte
Participante: Nilmar Pereira

projeto desenvolvido para a avaliação da disciplina de devops

a aplicação cadastra e gerencia obras de arte

## Sumário

* [Estrutura](#estrutura)
* [Dados](#dados)
* [Requisitos](#requisitos)
* [Executando o projeto](#executando-o-projeto)
* [Endpoints](#endpoints)
* [Exemplos de resposta](#exemplos-de-resposta)
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

Depois de subir, é só acessar:

* Front: http://localhost:3000
* API: http://localhost:3005
* Swagger: http://localhost:3005/swagger

## Endpoints

```text
GET    /artworks
GET    /artworks/:id
POST   /artworks
PATCH  /artworks/:id
DELETE /artworks/:id
```

### Exemplo

```json
{
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5000000
}
```

## Exemplos de resposta

**POST /artworks** (201)

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

```json
{
  "id": 1,
  "title": "abaporu",
  "artist": "Tarsila do amaral",
  "year": 1928,
  "price": 5000000
}
```

**PATCH /artworks/1** (200), enviando `{ "price": 5500000 }`

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

**GET /artworks/999** (404, não encontrada)

```json
{
  "statusCode": 404,
  "message": "Artwork not found",
  "error": "Not Found"
}
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
