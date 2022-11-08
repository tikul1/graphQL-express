const graphql = require("graphql");
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
const data = require("./MOCK_DATA.json");
const userType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllUsers: {
      type: new GraphQLList(userType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return data;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
      },
      resolve(parent, args) {
        data.push({ id: data.length + 1, first_name: args.first_name, last_name: args.last_name, email: args.email, gender: args.gender });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({ query: rootQuery, mutation: mutation });

// const graphql = require("graphql");
// const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
// const userData = require("./MOCK_DATA.json");

// const UserType = new GraphQLObjectType({
//   name: "User",
//   fields: () => ({
//     id: { type: GraphQLInt },
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
//       args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return userData;
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
//         userData.push({
//           id: userData.length + 1,
//           first_name: args.first_name,
//           last_name: args.last_name,
//           email: args.email,
//           gender: args.gender,
//         });
//         return args;
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
