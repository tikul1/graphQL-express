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
  type products{
    name: String,
    description: String,
    pCategoryId: catagories,
    id: ID
  }

  type catagories{
    name: String,
    id: ID
  }

  type Query{
    getProducts: [products],
    getCatagories:[catagories]
  }

  schema {
    query: Query
  }
`);


const root = {
  getCatagories: (args) => {
    return pCategories;
  },

  getProducts: (args) => {
    const AllProducts = products.map(p => {
      const category = pCategories.find((catagory) => catagory.id === p.pCategoryId);
      if (category) p.pCategoryId = category;
      return p;
    })
    return AllProducts;
  },

  catagory: (args) => {
    return pCategories.find((catagory) => catagory.id === getProducts.id);
  },

  product: (args) => {
    return products.find((product) => product.id === args.id);
  }
};

module.exports = { schema, root };