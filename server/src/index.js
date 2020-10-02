const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const Query = require("./resolvers/Query");

const prisma = new PrismaClient();

const resolvers = {
  Query,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});

// See https://github.com/prisma-labs/graphql-yoga#startoptions-options-callback-options-options--void----null-promisevoid
const options = {
  port: 4000,
  endpoint: "/graphql",
};
server.start(options, ({ port }) =>
  console.log(`Server is running on http://localhost:${port}`)
);
