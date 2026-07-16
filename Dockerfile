# Build the static web export, then serve it with nginx.
#
#   docker build -t kubernetes-desktop-site .
#   docker run --rm -p 8080:80 kubernetes-desktop-site
#
# The image serves the site at the root path. To build for a subpath
# (e.g. behind a reverse proxy), pass --build-arg BASE_URL=/some/path.

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG BASE_URL=""
ENV BASE_URL=${BASE_URL}
RUN npx expo export --platform web \
  && cp "dist/+not-found.html" dist/404.html

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO /dev/null http://localhost/ || exit 1
