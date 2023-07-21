FROM node:18.14.2-alpine3.17 AS builder

RUN apk add --no-cache libc6-compat

# get latest version of pnpm from https://www.npmjs.com/package/pnpm
RUN corepack enable && corepack prepare pnpm@8.6.0 --activate

RUN mkdir /app
WORKDIR /app
COPY . .
ENV NODE_ENV=production

RUN pnpm install -s

EXPOSE 9000
ENV PORT 9000
CMD ["pnpm", "start"]