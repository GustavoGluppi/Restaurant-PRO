# Restaurant‑PRO

> Projeto desenvolvido durante a hackathon **NOLA GOD LEVEL**  

## 🎯 Visão Geral  
O Restaurant‑PRO foi concebido para ser uma solução completa de gestão de data para restaurantes, incluindo a criação, edição e visualização de dashboards personalizados.  
Devido a questões pessoais e ao tempo limitado que tive para desenvolver o projeto, o foco principal entregue foi o **backend funcional**, enquanto o frontend ainda não está completamente funcional, e a criação de dashboards não foi concluída.

Apesar disso, a API backend já está preparada para receber requisições e gerenciar queries para consumo do banco de dados (inclusive com sistema de cache para consultas mais rápidas), podendo ser integrada a qualquer frontend futuramente.

## 🧩 Funcionalidades Desenvolvidas (Backend)  
- API REST para consumo de dados do banco PostgreSQL
- Sistema de cacheamento de queries utilizando Redis
- Configuração pronta para integração com banco de dados e deploy via Docker  

## 🚀 Tecnologias Utilizadas  
- **Backend**: Typescript + Express  
- **Banco de Dados / Cache**: PostgreSQL / Redis
- **Containerização**: Docker + Docker Compose  
- **Controle de versão**: Git + GitHub  

## 🧭 Pré‑requisitos  
- Docker instalado  
- Docker Compose disponível  

## ⚡ Setup
```shell
git clone https://github.com/GustavoGluppi/Restaurant-PRO.git
cd Restaurant-PRO

docker compose down -v
docker compose build --no-cache
docker compose run --rm data-generator
docker compose up
```

## 🚩 Endpoints

### 1. `POST /queryTable`

Consulta dados de uma tabela com filtros, agregações e ordenações.

**Body (JSON)**:

| Campo          | Tipo              | Obrigatório | Descrição                                                              |
| -------------- | ----------------- | ----------- | ---------------------------------------------------------------------- |
| `table`        | string            | ✅           | Nome da tabela a consultar                                             |
| `operation`    | string            | ❌           | Operação agregada: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`                 |
| `operationCol` | string            | ❌           | Coluna para aplicar a operação                                         |
| `subColumns`   | string | string[] | ❌           | Colunas adicionais a retornar                                          |
| `period`       | string            | ❌           | Período para filtro automático: `7days`, `30days`, `90days`, `360days` |
| `dateColumn`   | string            | ❌           | Coluna de data usada para filtros por período ou intervalo             |
| `startDate`    | string            | ❌           | Data de início para filtro customizado (YYYY-MM-DD)                    |
| `endDate`      | string            | ❌           | Data final para filtro customizado (YYYY-MM-DD)                        |
| `orderByCol`   | string            | ❌           | Coluna para ordenar resultados                                         |
| `orderBy`      | string            | ❌           | Tipo de ordenação: `ASC` ou `DESC`                                     |
| `groupBy`      | string            | ❌           | Agrupamento por período: `month` ou `year`                             |
| `groupByCol`   | string            | ❌           | Coluna de data usada para agrupamento                                  |

**Regras de validação:**

* `period` e `startDate`/`endDate` não podem ser usados juntos.
* `orderBy` exige `orderByCol`.
* `groupBy` exige `operation` e `groupByCol`.
* `groupBy` e `orderBy` não podem ser usados juntos.
* Limite de retorno: 150 linhas.

**Exemplo de requisição:**

```json
{
  "table": "sales",
  "operation": "SUM",
  "operationCol": "total_amount_items",
  "dateColumn": "created_at",
  "groupBy": "month",
  "groupByCol": "created_at",
  "period": "7days"
}
```

---

### 2. `GET /tables`

Retorna todas as tabelas do schema `public`.

**Exemplo de resposta:**

```json
["users", "sales", "products"]
```

---

### 3. `GET /cols/:table`

Retorna as colunas e tipos de dados de uma tabela específica.

**Parâmetro:**

* `table` — nome da tabela

**Exemplo de resposta:**

```json
[
  { "column_name": "id", "data_type": "integer" },
  { "column_name": "name", "data_type": "text" },
  { "column_name": "created_at", "data_type": "timestamp without time zone" }
]
```

---

## Cache

* Todas as consultas do endpoint `/queryTable` são armazenadas no Redis por 5 minutos.
* Chave de cache: JSON stringificado do body da requisição.

## Observações

* Limite de linhas retornadas: 150.
* Operações válidas: `SUM`, `AVG`, `MAX`, `MIN`, `COUNT`.
* Períodos válidos: `7days`, `30days`, `90days`, `360days`.
* Agrupamento por período válido: `month`, `year`.


