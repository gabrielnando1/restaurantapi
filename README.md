# RestaurantJS

A API for Restaurant Order Manager.

## 🚀 Starting

These instructions will allow you to get a copy of the project up and running on your local machine for development and testing purposes.

See **Prerequisites** and **Installation** for instructions on deploying the project.

### 📋 Prerequisites

What things do you need to install the software and how to install it?

```
To Run in Container:
    DOCKER (https://www.docker.com/)

To Run Locally:
    NodeJS (https://nodejs.org/en)
    Postresql (https://www.postgresql.org/)    

```

### 🔧 Installation

There are two ways of executing it, inside a container (Docker) or locally.

DOCKER:

```
After docker installed, open terminal in the project root and run:

    docker-compose up --build --force-recreate    
```

LOCALLY:

```
provide postgres connection parameters in:
    ./src/application/.dev
    
After the **Prerequisites** are installed, run at the project root:
    1- $ npm run migrations
    2- $ npm run start    
```

The API will respond on port 3000 and with swagger documentation in the path /swagger/, Ex: http://localhost:3000/swagger/

## ⚙️ Running the tests

To run the tests, simply execute the command:
    $ npm run test



## 🛠️ Built with

* [ExpressJS](https://expressjs.com/) 
* [Sequelize](https://sequelize.org/)


## ✒️ Autores


* **Gabriel Ribeiro** -  - [desenvolvedor](https://github.com/gabrielnando1)

