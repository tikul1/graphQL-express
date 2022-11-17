// const graphql = require("graphql");
// const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
// const data = require("../MOCK_DATA.json");
// const userType = new GraphQLObjectType({
//   name: "user",
//   fields: () => ({
//     id: { type: GraphQLInt },
//     first_name: { type: GraphQLString },
//     last_name: { type: GraphQLString },
//     email: { type: GraphQLString },
//     gender: { type: GraphQLString },
//   }),
// });

// const rootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     getAllUsers: {
//       type: new GraphQLList(userType),
//       args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return data;
//       },
//     },
//   },
// });

// const mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     createUser: {
//       type: userType,
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

// module.exports = new GraphQLSchema({ query: rootQuery, mutation: mutation });

const graphql = require("graphql");
const { buildSchema } = graphql;
const pCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Health" },
  { id: 3, name: "Sports" },
];
const products = [
  { id: 1, name: "Mobile", description: "item for sale", pCategoryId: 1 },
  { id: 2, name: "Laptop", description: "item for sale", pCategoryId: 1 },
  { id: 3, name: "TV", description: "item for sale", pCategoryId: 1 },
  { id: 4, name: "Medicines", description: "item for sale", pCategoryId: 2 },
  { id: 5, name: "Cosmetic", description: "item for sale", pCategoryId: 2 },
  { id: 6, name: "Dumbells", description: "item for sale", pCategoryId: 3 },
  { id: 7, name: "Cricked-Bat", description: "item for sale", pCategoryId: 3 },
  { id: 8, name: "Badminton", description: "item for sale", pCategoryId: 3 },
];

const schema = buildSchema(`
type Query{
  getProducts(id:ID, pCatagoryId:ID): [products],
  getCatagories:[catagories]
  catagory(id:ID!):catagory
  product(id:ID!):products
},
type products{
  name:String,
  description:String,
  pCategoryId:catagory,
  id: ID
  
},
type catagories{
  name:String,
  id:ID
}
type catagory{
  name:String
  id: ID
}

`);

const root = {
  getCatagories: (args) => {
    return pCategories;
  },
  getProducts: ({ catagory }, args) => {
    console.log(catagory);
    return { products, catagory };
  },
  catagory: ({ getProducts }, args) => {
    console.log("asda");

    console.log(getProducts);
    return pCategories.find((catagory) => catagory.id === getProducts.id);
  },
  // catagory1: (prducts, args) => {
  //   return pCategories.find((catagory) => catagory.id === args.id || catagory.id === products.pCategoryId);
  // },
  product: (args) => {
    return products.find((product) => product.id === args.id);
  },
};

module.exports = { schema, root };

// const pCatagortiesType = new GraphQLObjectType({
//   name: "ProductCatagory",
//   fields: () => ({
//     id: { type: new GraphQLNonNull(GraphQLInt) },
//     name: { type: new GraphQLNonNull(GraphQLString) },
//     products: {
//       type: new GraphQLList(productType),
//       resolve: (pCatagory) => {
//         return products.filter((product) => product.pCategoryId === pCatagory.id);
//       },
//     },
//   }),
// });

// const productType = new GraphQLObjectType({
//   name: "Product",
//   fields: () => ({
//     id: { type: new GraphQLNonNull(GraphQLInt) },
//     name: { type: new GraphQLNonNull(GraphQLString) },
//     description: { type: new GraphQLNonNull(GraphQLString) },
//     pCategoryId: { type: new GraphQLNonNull(GraphQLInt) },
//     productCatagory: {
//       type: pCatagortiesType,
//       resolve: (product) => {
//         return pCategories.find((catagory) => catagory.id === product.pCategoryId);
//       },
//     },
//   }),
// });

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     product: {
//       type: productType,
//       description: "List of single product",
//       args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return products.find((product) => product.id === args.id);
//       },
//     },
//     pCatagory: {
//       type: pCatagortiesType,
//       description: "List of single product Type",
//       args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return pCategories.find((product) => product.id === args.id);
//       },
//     },
//     getAllProducts: {
//       type: new GraphQLList(productType),
//       description: "List of all products",
//       // args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return products;
//       },
//     },
//     getAllPCatagories: {
//       type: new GraphQLList(pCatagortiesType),
//       description: "List of all catagories of products",
//       // args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return pCategories;
//       },
//     },
//   },
// });

// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     createProduct: {
//       type: productType,
//       args: {
//         name: { type: GraphQLString },
//         id: { type: GraphQLInt },
//         description: { type: GraphQLString },
//         pCategoryId: { type: GraphQLInt },
//       },
//       resolve(parent, args) {
//         products.push({
//           id: products.length + 1,
//           name: args.name,
//           description: args.description,
//           pCategoryId: args.pCategoryId,
//         });
//         return args;
//       },
//     },
//     createType: {
//       type: pCatagortiesType,
//       args: {
//         name: { type: GraphQLString },
//         id: { type: GraphQLInt },
//       },
//       resolve(parent, args) {
//         pCategories.push({
//           id: pCategories.length + 1,
//           name: args.name,
//         });
//         return args;
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation,
// });
