FROM node:22-alpine
WORKDIR /app
COPY package.json ./
COPY apps/api/package.json ./apps/api/package.json
RUN npm install
COPY . .
RUN npm --workspace @pes/api run build
EXPOSE 4000
CMD ["npm","--workspace","@pes/api","run","start"]
