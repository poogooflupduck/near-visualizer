import queries, { defaults } from "../../queries";
import { query } from "@/utils/indexer";

export default async function handler(req, res) {
  let q = queries[req.query.queryName];
  let checkedParameters = [];
  let paramsRecord = [];
  console.log("api query obj is");
  console.log(req.query);
  for (let parameterEntry of q[1]) {
    if (parameterEntry.length == 2) {
      let parameterName = parameterEntry[0];
      let localDefault = parameterEntry[1];
      checkedParameters.push(localDefault);
      paramsRecord.push(parameterName + ": " + localDefault);
    } else if (parameterEntry in req.query && req.query[parameterEntry]) {
      checkedParameters.push(req.query[parameterEntry]);
      paramsRecord.push(parameterEntry + ": " + req.query[parameterEntry]);
    } else {
      checkedParameters.push(defaults[parameterEntry]);
      paramsRecord.push(parameterEntry + ": " + defaults[parameterEntry]);
    }
  }
  const { rows } = await query(q[0], checkedParameters);
  console.log(rows);
  res.status(200).json({ data: rows, params: paramsRecord });
}
