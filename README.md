#  Library Management API

Welcome to the Library Management API! This project is a simple and efficient API for managing a library, built with NestJS, MongoDB, and TypeScript.

## [Api doc](https://lib-mng.onrender.com/api-doc)

##  Modules

###  Author
- Create, Read, Update, Delete (CRUD) operations

###  Book
- Create, Read, Update, Delete (CRUD) operations
- Pagination in Get All Books
- Get List of Books by Specific Author

##  Built With
- [NestJS](https://nestjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [pnpm](https://pnpm.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Husky](https://typicode.github.io/husky/)
- [Jest](https://jestjs.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://docker.io/)
- [Commitlint](https://commitlint.js.org/)
- [Lint-staged](https://www.npmjs.com/package/lint-staged)

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [pnpm](https://pnpm.io/) (If not installed, run `npm i -g pnpm`)

### 🔧 Setup

1. Set environment variables:

   Create a `.env` file and add the following:

   ```env
   APP_NAME=lib-manage
   PORT=3000
   DB_URI=localhost:27017

   #optional

   SWAGGER_DESCRIPTION=The lib-manage API 
   SWAGGER_PREFIX=/api-doc
   SWAGGER_VERSION=1.0
   ```

2. Clone the repository:

   ```sh
   git clone https://github.com/achu-BSL/lib-manage.git
   ```

3. Navigate to the project directory:

   ```sh
   cd lib-manage
   ```

4. Install dependencies:

   ```sh
   pnpm install
   ```

5. Start the development server:

   ```sh
   pnpm run start:dev
   ```



##  Running Tests

To run tests, use the following command:

```sh
pnpm run test
```


