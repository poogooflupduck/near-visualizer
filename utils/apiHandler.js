import { query } from "@/utils/indexer";
import config from "../config.json";

export default async function apiHandler(req, res, text, parameters) {
  let checkedParameters = [];
  console.log(req.query);
  for (let parameterName of parameters) {
    console.log(parameterName);
    if (parameterName in req.query && req.query[parameterName]) {
      checkedParameters.push(req.query[parameterName]);
    } else {
      checkedParameters.push(config["defaults"][parameterName]);
    }
  }
  const { rows } = await query(text, checkedParameters);
  res.status(200).json({ data: rows });
}
