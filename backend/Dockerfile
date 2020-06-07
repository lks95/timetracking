FROM node AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig*.json ./

COPY ./src ./src

COPY ./docs ./docs

# COPY ./tests ./tests

RUN npm ci --quiet && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node

WORKDIR /app
ENV NODE_ENV=production

#ENV DATABASE_URL=mongodb://database:27017

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=builder /usr/src/app/dist ./build
COPY --from=builder /usr/src/app/docs ./docs
