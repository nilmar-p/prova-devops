# Obras de Arte
Participante: Nilmar Pereira

projeto desenvolvido para a avaliação da disciplina de devops

a aplicação cadastra e gerencia obras de arte

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

## Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/nilmar-p/prova-devops.git
cd obras-de-arte
```

Execute:

```bash
docker compose -f deploy/docker-compose.yml up --build
```

Para parar:

```bash
docker compose -f deploy/docker-compose.yml down
```

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

## GitHub

Repositório público contendo as pastas `api`, `front` e `deploy`.
