const cors = require('cors');
const express = require('express');
const port = process.env.PORT|| 4000;
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const fs = require('fs');
const typeDefs = fs.readFileSync('./schema.graphql',{encoding:'utf-8'});
const resolvers = require('./resolvers');

const {makeExecutableSchema} = require('graphql-tools');
const schema = makeExecutableSchema({typeDefs, resolvers});

app.use(cors(), bodyParser.json());

const  {graphiqlExpress,graphqlExpress} = require('apollo-server-express');
app.use('/graphql',graphqlExpress({schema}));
app.use('/graphiql',graphiqlExpress({endpointURL:'/graphql'}));

app.listen(
   port, () => console.info(
      `Server started on port ${port}`
   )
);
//register middleware
app.use(bodyParser.json() , cors());
app.listen(port, () => console.log(`server is up and running at ${port}`));

// Adding Type Definitions
const typeDefinition = `
   type Query  {
      greeting: String
   }`

// Adding resolver
const  resolverObject = {
    Query : {
       greeting: () => 'Hello GraphQL  From TutorialsPoint !!'
    }
 }