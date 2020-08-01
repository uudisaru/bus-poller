FROM node:12-alpine AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk update && apk add python make g++ && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

# manually retain regenerator-runtime that will be removed by npm prune
RUN cp -r ./node_modules/regenerator-runtime ./

COPY . .

# lint & test
# RUN yarn lint & yarn test

# build application
RUN yarn build

# remove development dependencies
RUN npm prune --production

FROM node:12-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/regenerator-runtime ./node_modules/regenerator-runtime
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist

CMD [ "node", "./dist/index.js" ]
