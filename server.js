const express = require("express");
const mongoose = require("./db/db");
const app = express();
const PORT = 4000;
const graphQL = require("graphql");

const { graphqlHTTP } = require("express-graphql");
const data = require("./MOCK_DATA.json");
// const schema = require("./schema/schema1");            // static
// const { schema, root } = require("./schema/schema"); //static  buildSchema method
const { schema } = require("./schema/dbSchema"); //db   buildSchema method
const { root } = require("./resolver/graphqlRoot");
// const schema = require("./schema/dbSchema");        //db
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    rootValue: root,
    strictPopulate: false,
  })
);
app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
