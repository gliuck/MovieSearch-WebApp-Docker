# MovieSearch-WebApp-Docker
Virtual Networks and Cloud Computing exam project
## Table of Contents

- [1. Introduction](#1-introduction)
  - [1.1 Project Introduction](#11-project-introduction)
- [2. Database](#2-database)
  - [2.1 MongoDB](#21-mongodb)
- [3. Docker](#3-docker)
  - [3.1 DockerFile](#31-dockerfile)
  - [3.2 Docker-Compose](#32-docker-compose)
- [4. User Interface](#4-user-interface)
  - [4.1 User Interface Overview](#41-user-interface-overview)

## 1. Introduction

### 1.1 Project Introduction

The project is about a web application that allows users to search for movies based on the selected year and genre. The web page features two dropdown menus, one for selecting the year and the other for selecting the movie genre. After making the selections, the user can click a "Search Movies" button to initiate the search.

When the user clicks the button, a POST request is sent to the server containing the selected year and genre. The server receives the request and connects to the MongoDB database to search for movies that match the specified year and genre. The found movies are returned as a JSON response and displayed in a table on the web page. Each row in the table represents a movie and shows its title, director, genre, year, language, and cover.

The frontend of the application is developed in JavaScript, HTML, and CSS, allowing the user to interact with the web application through a simplified graphical interface. Meanwhile, the backend is developed in Node.js, a framework for building web applications in JavaScript. It handles user requests and communicates with the MongoDB database.

Overall, the project provides a web interface for searching movies based on the desired year and genre, using a MongoDB database as the data source. It consists primarily of three main components: a non-relational MongoDB database, the use of the graphical interface obtained through Mongo-Express, and Node.js, which manages communication with the database and the display of dynamic content on the index.html page.

<p align="center">
  <img src="https://github.com/gliuck/MovieSearch-WebApp-Docker/assets/48186637/ed064c54-722f-46a1-a710-4fe244240df5.jpg" width="500">
</p>

## 2. Database

### 2.1 MongoDB

MongoDB is one of the most well-known non-relational databases (or NoSQL). It is a document-oriented solution that leverages the JSON format for data storage and representation. The database was created using the official Docker image of MongoDB, which is available on Docker Hub. This allows you to create a container with MongoDB already configured and ready to use.

In addition, the official Docker image of Mongo-Express was also used, which allows you to create a container with the graphical interface of Mongo-Express, thus enabling the management of the MongoDB database.

Inside the server.js file, the database is created and populated with movie data, including fields such as title, director, genre, year, language, and cover. The MongoDB and Mongo-Express images have been included in the Docker Compose file, allowing them to be started together with the Node.js server.

## 3. Docker

### 3.1 DockerFile

The Dockerfile is a text file used to define the instructions necessary to create a Docker image. It describes how to build a single container by specifying the environment configuration, dependencies, and instructions to start the application. The Dockerfile contains a series of commands that are executed sequentially to create the desired container image. These commands include instructions to copy files into the image, install dependencies, run commands within the image's context, and configure the runtime environment.

In the following image, you can observe how the Dockerfile has been implemented. In summary, the latest Node.js image is used, a directory /home/app is created, and the application files are copied into it. Subsequently, the npm install command is executed to install the application's dependencies.

```Dockerfile
# Use the latest Node.js image as the base image
FROM node:latest

# Set environment variables within the container for enhanced flexibility
ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

# Create a parent directory /home/app
RUN mkdir -p /home/app

# Copy the application from the host to the container's /home/app directory
COPY ./app /home/app

# Set the default directory so that subsequent commands are executed within /home/app
WORKDIR /home/app

# Ensure that dependencies are installed within the container image
RUN npm install

# Command to start the application
CMD ["node", "server.js"]
This Dockerfile uses the latest Node.js image, establishes environment variables, creates a working directory, copies the application files into it, installs dependencies, and specifies the command to start the application.

For more specific details, please refer to the Dockerfile within the project's source code.
```
### 3.2 Docker-Compose

## Docker Compose

Docker Compose is a tool used to define and manage multi-container applications based on Docker. It provides a straightforward solution for orchestrating containers, allowing you to describe the entire application infrastructure in a YAML file.

I define the "server" service that will be built from the Dockerfile located in the same directory as the Docker Compose file. The container will be named "MovieSearch," and the service will be accessible through port 3000. Each service is generated based on the "image" field, which specifies the image from which the container will be created. In this case, it's mongo and mongoexpress.

For each image, the ports on which the services will be started are specified, and in the case of mongo, the volume for data persistence is also specified.


```yaml
# Docker Compose Version
version: '4'

# Service Definitions
services:

  # 'server' Service
  server:
    build: . # Specify the image to build
    container_name: MovieSearch
    ports:
      - 3000:3000
    command: node server.js
    networks:
      - MovieSearch_network

  # 'mongodb' Service
  mongodb:
    image: mongo # Use a pre-defined image from Docker Hub
    ports:
      - 27017:27017
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=password
    volumes:
      - mongo-data:/data/Films
    networks:
      - MovieSearch_network

  # 'mongo-express' Service
  mongo-express:
    image: mongo-express:latest # Use a pre-defined image from Docker Hub
    restart: always
    ports:
      - 8080:8081
    environment:
      - ME_CONFIG_MONGODB_ADMINUSERNAME=admin
      - ME_CONFIG_MONGODB_ADMINPASSWORD=password
      - ME_CONFIG_MONGODB_SERVER=mongodb
    networks:
      - MovieSearch_network

# Volume Definitions
volumes:
  mongo-data:
    driver: local

# Network Definitions
networks:
  MovieSearch_network:
    driver: bridge
```
## 4. User Interface

### 4.1 User Interface Overview

The web interface of this page allows users to search for movies based on the desired year and genre. By clicking the "Search Movies" button, a request is sent to the server listening on port 3000. The server then makes requests to the MongoDB container, which is listening on port 27017, to retrieve a list of results displayed in a table on the web page.

<p align="center">
  <img src="https://github.com/gliuck/MovieSearch-WebApp-Docker/assets/48186637/d0646c46-0380-4386-9d8b-b184e2945f8f.jpg" width="500">
</p>








