Génial — on transforme tout ça en un **LAB pas-à-pas**, pensé pour débutant, qui part de zéro (installation + debug) jusqu’au **déploiement d’une API RESTful en TypeScript**, d’abord en **Express** (local) puis en **AWS Lambda via Terraform**.
À chaque étape, je t’explique **pourquoi** on le fait, pour ancrer la compréhension.

---

# 🧪 LAB — Construire & déployer une API RESTful en TypeScript

## 0) C’est quoi une API RESTful (en deux phrases)

Une API RESTful expose des **ressources** (ex. `livres`) via des **endpoints HTTP** (`GET/POST/PUT/DELETE`), renvoie des **représentations JSON**, et s’appuie sur les règles du protocole HTTP (codes 200/201/404, en-têtes, etc.). En pratique, beaucoup d’« API REST » du web sont des **HTTP APIs** qui suivent *plus ou moins* les contraintes REST, et c’est suffisant pour démarrer. ([MDN Web Docs][1], [Microsoft Learn][2])

---

## 1) Mise en place des outils

### Pourquoi ?

* **Node.js** exécute JavaScript côté serveur.
* **TypeScript** ajoute les **types** → code plus sûr et plus clair.
* **VS Code** offre une excellente **expérience de debug** (points d’arrêt, pas à pas). ([TypeScript][3], [Visual Studio Code][4])

### Installation (une fois)

1. Installe **Node.js (LTS)** depuis nodejs.org, puis vérifie :

```bash
node -v
npm -v
```

2. Crée le dossier du projet et initialise npm :

```bash
mkdir ts-rest-lab && cd ts-rest-lab
npm init -y
```

3. Installe TypeScript, Express et outils dev :

```bash
npm i express
npm i -D typescript ts-node nodemon @types/express
npx tsc --init
```

> **Pourquoi `nodemon` ?** Il **redémarre automatiquement** le serveur quand tu modifies un fichier → cycle de feedback rapide. **`ts-node`** lance directement du TypeScript sans pré-compiler. ([nodemon.io][5], [typestrong.org][6])

---

## 2) Arborescence & config

### Structure conseillée

```
ts-rest-lab/
├─ src/
│  ├─ models/
│  │  └─ book.ts
│  ├─ controllers/
│  │  └─ books.controller.ts
│  ├─ routes/
│  │  └─ books.routes.ts
│  ├─ db/
│  │  └─ memory.ts
│  └─ server.ts
├─ package.json
└─ tsconfig.json
```

### `tsconfig.json` (mets à jour les options clés)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true
  },
  "include": ["src"]
}
```

### Scripts NPM (dans `package.json`)

```json
{
  "scripts": {
    "dev": "nodemon --watch src --ext ts --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

* **`dev`** : idéal en développement (redémarre seul)
* **`build`** : compile TS → JS
* **`start`** : lance la version compilée

---

## 3) Code de l’API (exemple: gestion de livres)

### `src/models/book.ts`

```ts
export interface Book {
  id: string;
  title: string;
  author: string;
  available: boolean;
}
```

### `src/db/memory.ts` (BDD en mémoire pour débuter)

```ts
import { Book } from "../models/book";

export const db: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: "2", title: "You Don't Know JS", author: "Kyle Simpson", available: true }
];
```

### `src/controllers/books.controller.ts`

```ts
import { Request, Response } from "express";
import { db } from "../db/memory";
import { Book } from "../models/book";
import { randomUUID } from "crypto";

export const listBooks = (req: Request, res: Response) => {
  res.json(db);
};

export const getBook = (req: Request, res: Response) => {
  const book = db.find(b => b.id === req.params.id);
  return book ? res.json(book) : res.status(404).json({ message: "Not found" });
};

export const createBook = (req: Request, res: Response) => {
  const { title, author } = req.body ?? {};
  if (!title || !author) return res.status(400).json({ message: "title & author required" });
  const newBook: Book = { id: randomUUID(), title, author, available: true };
  db.push(newBook);
  res.status(201).json(newBook);
};

export const updateBook = (req: Request, res: Response) => {
  const idx = db.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  db[idx] = { ...db[idx], ...req.body };
  res.json(db[idx]);
};

export const deleteBook = (req: Request, res: Response) => {
  const idx = db.findIndex(b => b.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  const [removed] = db.splice(idx, 1);
  res.json(removed);
};
```

### `src/routes/books.routes.ts`

```ts
import { Router } from "express";
import { listBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/books.controller";

const router = Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
```

### `src/server.ts`

```ts
import express from "express";
import booksRouter from "./routes/books.routes";

const app = express();
app.use(express.json());

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

// Ressource RESTful principale
app.use("/api/books", booksRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
```

---

## 4) Lancer, tester, comprendre

### Démarrer en mode développement (avec redémarrage auto)

```bash
npm run dev
```

* **Pourquoi ?** `nodemon` regarde les changements de fichiers et **relance** `ts-node` automatiquement → tu te concentres sur le code. ([nodemon.io][5], [npm][7])

### Tester avec `curl` (ou une extension VS Code comme *Thunder Client*)

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/books
curl -X POST http://localhost:3000/api/books -H "Content-Type: application/json" \
  -d '{"title":"Domain-Driven Design","author":"Eric Evans"}'
```

---

## 5) Debugger pas-à-pas dans VS Code

### Pourquoi ?

Visualiser les variables, poser des **breakpoints**, exécuter **pas à pas** → comprendre en profondeur.

### Configuration `.vscode/launch.json`

Crée le dossier `.vscode/launch.json` avec :

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug API (nodemon + ts-node)",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal",
      "restart": true
    }
  ]
}
```

* Lance **Run and Debug** → choisis *Debug API (nodemon + ts-node)*.
* Mets un breakpoint, sauvegarde un fichier → `nodemon` relance, le **debugger reste attaché**. (Doc VS Code : utilisation de nodemon avec le débogueur.) ([Visual Studio Code][4])

> Alternative : exécuter avec `ts-node` sans nodemon et activer `--inspect`, mais la combinaison **nodemon + VS Code** est très pratique pour débuter. ([Visual Studio Code][4])

---

## 6) Pourquoi Express pour démarrer ?

Express est un **micro-framework HTTP** minimal et flexible : parfait pour créer vite des endpoints, des middlewares, gérer JSON, etc. ([Express][8])

---

## 7) Passage au serverless : Lambda + API Gateway (déploiement Terraform)

### Idée clé

En production **serverless**, ton code ne tourne pas en serveur « toujours allumé ».
→ **API Gateway** reçoit la requête HTTP et **déclenche une Lambda** qui exécute **une fois** ton handler, puis s’arrête. On paie **à l’usage**. (Choix courant : **HTTP API** d’API Gateway, moins cher et suffisant pour beaucoup de cas.) ([AWS Documentation][9])

### Étape A — Créer un handler Lambda (TS)

Ajoute un dossier `src/lambda/` et ce fichier minimaliste **sans Express** (plus simple côté Lambda) :

#### `src/lambda/handler.ts`

```ts
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import { db } from "../db/memory";
import { randomUUID } from "crypto";

export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const method = event.requestContext.http.method;
  const path = event.rawPath || "/";

  // Routes simples: /api/books et /api/books/{id}
  const id = event.pathParameters?.id;

  try {
    if (method === "GET" && path === "/health") {
      return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    }

    if (method === "GET" && path === "/api/books") {
      return { statusCode: 200, body: JSON.stringify(db) };
    }

    if (method === "GET" && id && path.startsWith("/api/books/")) {
      const book = db.find(b => b.id === id);
      return book
        ? { statusCode: 200, body: JSON.stringify(book) }
        : { statusCode: 404, body: JSON.stringify({ message: "Not found" }) };
    }

    if (method === "POST" && path === "/api/books") {
      const body = event.body ? JSON.parse(event.body) : {};
      if (!body.title || !body.author)
        return { statusCode: 400, body: JSON.stringify({ message: "title & author required" }) };
      const newBook = { id: randomUUID(), title: body.title, author: body.author, available: true };
      db.push(newBook);
      return { statusCode: 201, body: JSON.stringify(newBook) };
    }

    if (method === "PUT" && id && path.startsWith("/api/books/")) {
      const idx = db.findIndex(b => b.id === id);
      if (idx === -1) return { statusCode: 404, body: JSON.stringify({ message: "Not found" }) };
      const body = event.body ? JSON.parse(event.body) : {};
      db[idx] = { ...db[idx], ...body };
      return { statusCode: 200, body: JSON.stringify(db[idx]) };
    }

    if (method === "DELETE" && id && path.startsWith("/api/books/")) {
      const idx = db.findIndex(b => b.id === id);
      if (idx === -1) return { statusCode: 404, body: JSON.stringify({ message: "Not found" }) };
      const [removed] = db.splice(idx, 1);
      return { statusCode: 200, body: JSON.stringify(removed) };
    }

    return { statusCode: 404, body: JSON.stringify({ message: "Route not found" }) };
  } catch (err: any) {
    return { statusCode: 500, body: JSON.stringify({ message: err?.message ?? "Server error" }) };
  }
}
```

### Étape B — Compiler pour Lambda

Ajoute un script dédié :

```json
{
  "scripts": {
    "build:lambda": "tsc -p tsconfig.json && cp package.json dist/"
  }
}
```

*(Ici on compile tout vers `dist/`. Terraform zippera ce dossier.)*

### Étape C — Terraform : API Gateway HTTP + Lambda

1. **Pré-requis**

   * Avoir un compte AWS et des **identifiants** configurés (via `aws configure` ou variables d’environnement).
   * Terraform installé.
   * Choisir une **région** (ex: `eu-west-1`).
   * Lambda Node.js **runtime** (ex: `nodejs20.x` ou version plus récente disponible). ([AWS Documentation][10])

2. Fichiers Terraform (dans `infra/`)

**`infra/main.tf`**

```hcl
terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.region
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

# Zipper le code compilé (dist) pour la Lambda
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../dist"
  output_path = "${path.module}/lambda.zip"
}

# Rôle IAM pour Lambda (exemple simple)
resource "aws_iam_role" "lambda_exec" {
  name = "ts_rest_lab_lambda_exec"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Effect = "Allow",
      Principal = { Service = "lambda.amazonaws.com" },
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_logs" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda (HTTP handler)
resource "aws_lambda_function" "api" {
  function_name    = "ts-rest-lab-handler"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "lambda/handler.handler"   # dist/lambda/handler.js -> export handler
  runtime          = "nodejs20.x"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  architectures    = ["arm64"]

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
    }
  }
}

# API Gateway HTTP API (v2)
resource "aws_apigatewayv2_api" "http_api" {
  name          = "ts-rest-lab-http"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api.arn
  payload_format_version = "2.0"
}

# Routes: /health, /api/books, /api/books/{id}, et fallback
resource "aws_apigatewayv2_route" "health" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /health"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "books" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /api/books"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "books_id" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /api/books/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# Permission pour qu'API Gateway invoque la Lambda
resource "aws_lambda_permission" "allow_apigw" {
  statement_id  = "AllowInvokeByAPIGW"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}

output "base_url" {
  value       = aws_apigatewayv2_api.http_api.api_endpoint
  description = "API base URL"
}
```

> On utilise **API Gateway v2 (HTTP API)** + **intégration proxy** pour router toutes les requêtes sur la **même Lambda**. Références Terraform : `aws_apigatewayv2_api`, `aws_apigatewayv2_integration`, `aws_lambda_function`. ([Terraform Registry][11])

3. **Build & Apply**

```bash
# À la racine du projet
npm run build:lambda

# Puis déploiement Terraform
cd infra
terraform init
terraform apply
```

Note la valeur `base_url` en sortie, puis teste :

```bash
curl "$(terraform output -raw base_url)/health"
curl "$(terraform output -raw base_url)/api/books"
```

> **Comprendre la différence (local vs Lambda)**
>
> * **Local (Express)** : un **processus Node** écoute en continu sur `localhost:3000`.
> * **Lambda** : **pas de serveur permanent** ; API Gateway appelle ta **fonction** à chaque requête. Choisis **HTTP API** (v2) quand tu veux un **coût réduit** et une config minimale ; choisis **REST API** (v1) si tu as besoin de fonctionnalités avancées (quotas, clés API, etc.). ([AWS Documentation][9])

> **Runtime Node.js** côté Lambda : utilise une version supportée (ex. Node.js 20.x ; Node.js 22 est également disponible selon régions). ([AWS Documentation][10], [Amazon Web Services, Inc.][12])

4. **Nettoyer (éviter les coûts)**

```bash
terraform destroy
```

---

## 8) Pourquoi on fait *exactement* ces choix ?

* **TypeScript** : clarifie les modèles (`Book`) et sécurise les contrôleurs. ([TypeScript][3])
* **Express** : très simple pour **apprendre** les routes REST. ([Express][8])
* **nodemon + ts-node** : boucle de feedback rapide, idéale pour **déboguer** et comprendre. ([nodemon.io][5], [typestrong.org][6])
* **VS Code Debugger** : points d’arrêt, pas-à-pas → compréhension profonde. ([Visual Studio Code][4])
* **Lambda + API Gateway** : architecture **serverless**, scalable et facturée à l’usage. Terraform **automise** le provisioning. ([HashiCorp Developer][13])

---

## 9) Checklist « Je sais faire »

* [ ] Expliquer ce qu’est une **API RESTful** (ressources, verbes HTTP, codes).
* [ ] Lancer un **serveur Express** en TypeScript.
* [ ] Utiliser **nodemon** + **VS Code** pour **debugger**.
* [ ] Écrire des routes `GET/POST/PUT/DELETE` pour `/api/books`.
* [ ] **Packager** et **déployer** une Lambda via **Terraform** + **API Gateway**.
* [ ] Tester en local et via l’URL AWS.

---

## 10) Pour aller plus loin (références officielles)

* MDN – **REST** (définitions & contexte). ([MDN Web Docs][1])
* Express – **Framework web pour Node**. ([Express][8])
* nodemon – **Redémarrage automatique**. ([nodemon.io][5])
* ts-node – **Exécuter TypeScript directement**. ([typestrong.org][6])
* VS Code – **Débogage Node.js**. ([Visual Studio Code][4])
* AWS – **Lambda Node.js** et **API Gateway HTTP API**. ([AWS Documentation][14])
* Terraform – **Lambda** & **API Gateway v2**. ([Terraform Registry][15])
* Tutoriel HashiCorp – **Lambda + API Gateway**. ([HashiCorp Developer][13])
