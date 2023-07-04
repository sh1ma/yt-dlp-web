FROM node:20.2 as builder

WORKDIR /app

COPY . /app

# RUN corepack enable pnpm && pnpm install 

RUN npm ci

RUN npm run build



FROM nginx:latest

COPY --from=builder /app/dist /var/www/html

COPY nginx.conf /etc/nginx/nginx.conf