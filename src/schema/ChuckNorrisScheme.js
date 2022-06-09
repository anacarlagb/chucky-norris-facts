const { ApolloServer, gql } = require("apollo-server");

const schema = gql(`
  type Query{
    created_at: String!;
    categories: [];
    icon_url: String!;
    id: string;
    updated_at: String!;
    url: String!;
    value: String!;
  }

  `);

  var resolvers = {
    Query: {
      currentCategory: (parent, args) => {
        let catetory = data.catetory.find((u) => u === args);
        return user;
      }
    },
  }