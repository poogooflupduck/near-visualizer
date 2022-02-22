import queries from "../../queries";
import config from "../../config.json";

import { query } from "@/utils/indexer";

export default async function handler(req, res) {
  let q = queries[req.query.queryName];
  let checkedParameters = [];
  let paramsRecord = [];
  console.log("api query obj is");
  console.log(req.query);
  for (let parameterName of q[1]) {
    console.log(parameterName);
    if (parameterName in req.query && req.query[parameterName]) {
      checkedParameters.push(req.query[parameterName]);
      paramsRecord.push(parameterName + ": " + req.query[parameterName]);
    } else {
      checkedParameters.push(config["defaults"][parameterName]);
      paramsRecord.push(
        parameterName + ": " + config["defaults"][parameterName]
      );
    }
  }
  const { rows } = await query(q[0], checkedParameters);
  console.log(rows);
  res.status(200).json({ data: rows, params: paramsRecord });
}
