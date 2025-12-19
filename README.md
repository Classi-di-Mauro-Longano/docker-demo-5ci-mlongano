# Task API

REST API per la gestione di task, costruita con Node.js, Express e SQLite.

## Stack Tecnologico

| Tecnologia | Scopo |
|------------|-------|
| **Node.js 20** | Runtime JavaScript |

- Express 4: Framework web
- better-sqlite3: Database embedded
- Helmet: Security headers
- express-validator: Validazione input
- Morgan: HTTP logging


## Struttura del progetto

```txt
src/
.dockerignore
.env.example
.gitignore
compose.yaml
Dockerfile
package.json
README.md
```

## API Endpoints

### Health Check

```http
GET /health
```

Risposta:

```json
{
  "status": "healthy",
  "timestamp": "2025-12-19-.......",
  "uptime": 3621.5,
  "environment": "production"
}
```





```txt
```