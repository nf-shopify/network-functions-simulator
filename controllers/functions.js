const functionModel = require("../models/function");

module.exports = {
  index
};

function index(req, res) {
  const functions = functionModel.getAll();
  res.json(functions);
}
