# Stage 1: test
FROM node:18-alpine as tester

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run test:headless

#Stage 2: build app
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


#Stage 3: Nginx
FROM nginx:1.23.3 as prod
EXPOSE 80

COPY --from=builder /app/dist/riu-frontend-damian-argote/browser /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx","-g", "daemon off;"]