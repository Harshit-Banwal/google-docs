const Document = require('../models/Document');

const findOrCreate = async (id) => {
  if (id === null) return;

  const doc = await Document.findById(id);
  if (doc) return doc;

  return await Document.create({ _id: id, data: '' });
};

module.exports = {
  findOrCreate,
};
