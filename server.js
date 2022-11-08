const express = require("express");
const mongoose = require("./db/db");
const app = express();
const PORT = 4000;
const graphQL = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphQL;

const { graphqlHTTP } = require("express-graphql");
const data = require("./MOCK_DATA.json");
const schema = require("./schema");
app.use(express.json());

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     first_name: { type: GraphQLString },
//     last_name: { type: GraphQLString },
//     email: { type: GraphQLString },
//     gender: { type: GraphQLString },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       resolve(parent, args) {
//         let data = [
//           {
//             first_name: "hardik",
//             last_name: "parmar",
//             email: "abc@def.com",
//             gender: "male",
//           },
//         ];
//         return data;
//       },
//     },
//   },
// });

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     createUser: {
//       type: UserType,
//       args: {
//         first_name: { type: GraphQLString },
//         last_name: { type: GraphQLString },
//         email: { type: GraphQLString },
//         gender: { type: GraphQLString },
//       },
//       resolve(parent, args) {
//         data.push({ id: data.length + 1, first_name: args.first_name, last_name: args.last_name, email: args.email, gender: args.gender });
//         return args;
//       },
//     },
//   },
// });

// const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`app running on ${PORT}`);
});
