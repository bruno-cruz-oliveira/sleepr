# Sleepr

Bem-vindo ao **Sleepr**! Este é um projeto simples desenvolvido para aprendizado de arquitetura de microsserviços utilizando **NestJS**.

A ideia do projeto é simular uma versão extremamente simplificada do **Airbnb**, fornecendo funcionalidades básicas de reservas e hospedagem.

O objetivo deste projeto é demonstrar como criar, comunicar e orquestrar múltiplos serviços backend, utilizando práticas modernas e ferramentas robustas.

## 🚀 Tecnologias

As principais tecnologias e ferramentas utilizadas neste projeto incluem:

- **[NestJS](https://nestjs.com/)**: Framework Node.js progressivo para construção de aplicações eficientes e escaláveis.
- **[TypeScript](https://www.typescriptlang.org/)**: Superset tipado de JavaScript.
- **[Docker](https://www.docker.com/)** & **Docker Compose**: Para containerização e orquestração dos serviços e banco de dados.
- **[RabbitMQ](https://www.rabbitmq.com/)**: Message broker para comunicação assíncrona entre microsserviços.
- **[MongoDB](https://www.mongodb.com/)**: Banco de dados NoSQL para persistência de dados.
- **GraphQL**: (Gateway) Para exposição de API unificada.

## 📦 Microsserviços

O projeto é composto pelos seguintes microsserviços (localizados na pasta `apps/`):

- **Gateway**: Ponto de entrada (API Gateway), responsável por receber as requisições e roteá-las.
- **Auth**: Serviço responsável pela autenticação e gestão de usuários.
- **Reservations**: Gerenciamento de reservas.
- **Payments**: Processamento de pagamentos.
- **Notifications**: Envio de notificações.

## 🛠️ Como Rodar

A maneira mais fácil de rodar todo o ecossistema é utilizando o Docker Compose.

### Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose instalados.
- [Node.js](https://nodejs.org/) (opcional, para rodar scripts locais).
- [pnpm](https://pnpm.io/) (gerenciador de pacotes utilizado, opcional se usar apenas Docker).

### Passo a passo

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/sleepr.git
    cd sleepr
    ```

2.  **Instale as dependências (caso queira rodar localmente ou para desenvolvimento):**

    ```bash
    npm install -g pnpm
    pnpm install
    ```

3.  **Configuração de Variáveis de Ambiente:**
    Verifique se há arquivos `.env` necessários em cada pasta de aplicativo dentro de `apps/` ou configure-os conforme os exemplos (se houver `env.example`).
    _Nota: O `docker-compose.yaml` já mapeia os arquivos `.env` de cada serviço._

4.  **Subir a aplicação:**
    Execute o comando abaixo para construir e iniciar todos os serviços, banco de dados e fila:

    ```bash
    docker-compose up --build
    ```

    Isso iniciará:
    - Os 5 microsserviços (auth, gateway, notifications, payments, reservations).
    - Banco de dados MongoDB.
    - RabbitMQ.

## 🔍 Desenvolvimento

Se você deseja rodar um serviço especificamente em modo de desenvolvimento fora do Docker (necessita das deps de infraestrutura rodando, ex: Mongo/RabbitMQ):

```bash
# Exemplo para rodar o serviço de reservas
pnpm run start:dev reservations
```

## � CI/CD

O projeto conta com configurações de Integração Contínua e Entrega Contínua (CI/CD) para dois grandes provedores de nuvem:

### Google Cloud Platform (GCP)

Utiliza o **Cloud Build** (`cloudbuild.yaml`) para construir e enviar as imagens Docker dos microsserviços para o **Artifact Registry** do GCP.

### Amazon Web Services (AWS)

Utiliza o **AWS CodeBuild** (`buildspec.yaml`) para o processo de build e push das imagens para o **Elastic Container Registry (ECR)**.

Ambos os pipelines automatizam a construção das imagens de produção para os serviços: `reservations`, `auth`, `notifications` e `payments`.

## �📝 Licença

Este projeto é para fins de aprendizado. Sinta-se à vontade para estudar e modificar!
