FROM nginx:stable AS base
WORKDIR /usr/src/docs/
COPY .nginx/.conf /etc/nginx/nginx.conf
COPY _site ./_site

FROM base AS dependencies

RUN mkdir -p /var/cache/nginx && \
    chown -R nginx:nginx /usr/src/docs /var/cache/nginx

USER nginx

EXPOSE 8000