// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "schemaone",
//   password: "root"
// });

// module.exports = pool.promise();

// =====================sequelizer=================================
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("schemaone", "root", "root", {
//   dialect: "mysql",
//   host: "localhost"
// });
// module.exports = sequelize;

// ===================== mongodb ===================================

// const MongoClient = require("mongodb").MongoClient;

// const url =
//   // "mongodb+srv://chitrang:root@cluster0-4eas1.mongodb.net/database?retryWrites=true&w=majority";
//   "mongodb+srv://chitrang:root@cluster0-4eas1.mongodb.net/test?retryWrites=true&w=majority";
// let _db;

// const mongoConnect = callback => {
//   MongoClient.connect(url, { useUnifiedTopology: true })
//     .then(client => {
//       _db = client.db();
//       console.log("Database Connected");
//       callback();
//     })
//     .catch(err => {
//       throw err;
//     });
// };
// const getDatabase = () => {
//   if (_db) return _db;
//   throw "Don't Have Database Created Yet!";
// };
// module.exports.mongoConnect = mongoConnect;
// module.exports.getDatabase = getDatabase;
