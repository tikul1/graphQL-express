const mongoose = require("mongoose");
mongoose
  .connect("mongoose://localhost:27017/graphQL")
  .then(() => console.log("db connected"))
  .catch(() => console.log(err));

module.exports = mongoose;
