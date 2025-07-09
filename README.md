# Superheroes App Challenge
This project is a challenge proposed by the MinData team for the RIU Hotel client.  
It consists of a superhero management application built with Angular.  
**Author: Damian Argote**

---
## Prerequisites

- Install [Docker](https://docs.docker.com/get-docker/)
- Install [Node.js](https://nodejs.org/) (only needed for local development without Docker)

---

## Running in Development Mode

1. Install dependencies

```bash
npm install
```

2. Start the Angular development server and open a browser
```bash
ng serve -o
```

## Running in Production Mode

1. Build the production image (using Dockerfile)

```bash
docker build -t heroes-app . --no-cache
```

2. Run the container (for example, on port 80)

```bash
docker container run -p 80:80 heroes-app
```