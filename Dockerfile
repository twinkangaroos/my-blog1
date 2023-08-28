# Build locally
# docker build . -t nextapp
# Run locally
# docker run -it -p 8080:3000 nextapp
#
#https://gallery.ecr.aws/bitnami/node
#https://github.com/bitnami/containers/tree/main/bitnami/node/18/debian-11
#https://qiita.com/niwasawa/items/9673d31ee2a6c532dc5b

FROM public.ecr.aws/bitnami/node:18.17.1-debian-11-r14
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]