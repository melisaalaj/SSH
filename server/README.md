<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).



```markdown
# Online Food Service 

This repository contains the backend code for an online food service built using Node.js. It provides the server-side functionality to handle user requests, process orders, manage menus, and interact with a database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Database](#database)

## Installation

To install and run this project locally, please follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/melisaalaj/SSH.git
   ```

2. Navigate to the project directory:

   ```shell
   cd SSH
   cd server
   ```

3. Install the dependencies:

   ```shell
   npm install
   ```

4. Set up the environment variables:

   Create a `.env` file in the root directory and specify the following variables:

   ```plaintext
   PORT=3000
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_NAME=your-database-name
   DB_USERNAME=your-database-username
   DB_PASSWORD=your-database-password
   ```

   Make sure to replace `your-database-host`, `your-database-port`, `your-database-name`, `your-database-username`, and `your-database-password` with the appropriate values for your database configuration.

5. Run the application:

   ```shell
   npm run start
   ```

   Now the backend server should be running on `http://localhost:3000`.

## Usage

The backend provides a RESTful API for managing users, menus, and orders. It can be integrated with a frontend application or accessed directly using an API testing tool such as Postman or Swagger.

Before accessing the API, make sure the backend server is up and running.

## Features

The backend offers the following features:

- User authentication and authorization
- Menu management (create, read, update, delete)
- Order processing
- Error handling and validation

## API Endpoints

- **POST** `/api/auth/signup` - Register a new user
- **POST** `/api/auth/login` - Authenticate a user and generate a token
- **POST** `/api/Menu/create/{id}` - Create a new menu for a specific restaurant
- **GET** `/api/menus/{id}` - Get a menu by ID
- **POST** `/api/Menu/{id}` - Update a menu by ID
- **DELETE** `/api/Menu/{id}` - Delete a menu by ID
- **POST** `/api/order/create/{restaurantid}` - Place a new order
- **GET** `/api/order/{id}` - Get an order by ID

These are just a few examples of the available endpoints. There are more endpoints that handle additional functionality and operations.

For a complete list of all the available endpoints and their details, including request/response formats and parameters, we provide comprehensive API documentation using Swagger.

### Accessing the Swagger Documentation

To view the complete list of available endpoints and their details, including examples and parameter descriptions, access the Swagger documentation using the following link:

[Swagger Documentation](http://localhost:3000/docs/#/)

Please note that the link provided assumes that the backend server is running on `http://localhost:3000`. If your server is running on a different URL, replace `http://localhost:3000` with the appropriate base URL.

By accessing the Swagger documentation, you will have a comprehensive overview of all the available endpoints and their functionalities. This documentation will assist you in understanding and utilizing the API effectively.

## Database

The backend utilizes a database to store menus, users, and orders. It's recommended to use a relational database such as PostgreSQL.

Ensure that you have set up the database and provided the correct configuration in the `.env` file.
