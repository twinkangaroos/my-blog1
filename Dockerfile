# Build locally
# docker build . -t nextapp
# Run locally
# docker run -it -p 8080:3000 nextapp
#
#https://gallery.ecr.aws/bitnami/node
#https://github.com/bitnami/containers/tree/main/bitnami/node/18/debian-11
#https://qiita.com/niwasawa/items/9673d31ee2a6c532dc5b
#https://beebom.com/how-fix-exec-user-process-caused-exec-format-error-linux/
#FROM --platform=linux/amd64 public.ecr.aws/bitnami/node:18.17.1-debian-11-r14
#FROM --platform=linux/amd64 public.ecr.aws/docker/library/node:18.17
FROM public.ecr.aws/docker/library/node:18.17

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
