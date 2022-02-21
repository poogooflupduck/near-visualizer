import { Sequelize, QueryTypes } from "sequelize";
import pg from "pg";

// const indexer = new Sequelize(
//   "postgres://public_readonly:nearprotocol@mainnet.db.explorer.indexer.near.dev/mainnet_explorer",
//   {
//     dialect: "postgres",
//     // dialectModule: pg,
//   }
// );

// module.exports = {
//   indexer,
//   QueryTypes,
// };

const { Pool, Client } = require("pg");
const connectionString =
  "postgres://public_readonly:nearprotocol@mainnet.db.explorer.indexer.near.dev/mainnet_explorer";
const pool = new Pool({
  connectionString,
});

module.exports = { query: (text, params) => pool.query(text, params) };
