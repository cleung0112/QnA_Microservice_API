const client = require('../Database/index.js');

module.exports = {
  insertProduct: function (product_id) {
    const query = "INSERT INTO product (product_id) VALUES ($1)";
    client.query(query, [ product_id ], (err, result) => {
      if (err) {
        console.log('err at query', err)
      }
      console.log(result);
    })
  }
}

