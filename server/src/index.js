const { GraphQLServer } = require("graphql-yoga");

// Dummy data
let colorCodes = [
  {
    id: "1",
    red: 0,
    green: 0,
    blue: 0,
    luminance: 0,
  },
  {
    id: "16777216",
    red: 255,
    green: 255,
    blue: 255,
    luminance: 1,
  },
];

const resolvers = {
  Query: {
    info: () => `This is the API of Luminance Picker`,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
