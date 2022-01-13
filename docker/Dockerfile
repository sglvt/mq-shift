FROM public.ecr.aws/docker/library/node:16.13.2-alpine3.15
RUN mkdir -p /web
WORKDIR /
COPY web /web
RUN yarn install && \
    yarn run build && \
    yarn run prune && \
    yarn cache clean
CMD [ "npm", "start" ]
EXPOSE 3000