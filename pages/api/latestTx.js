import { query } from "@/utils/indexer";

export default async function handler(req, res) {
  req.query.after && console.log("req query has an after:" + req.query.after);
  const queryText =
    `
    SELECT * FROM public.transactions
  ` +
    (req.query.after ? `WHERE block_timestamp > $1` : ``) +
    `
  ORDER BY block_timestamp DESC LIMIT 10
  `;
  const queryValues = req.query.after ? [req.query.after] : [];
  console.log(await query(queryText, queryValues).err);

  const { rows } = await query(queryText, queryValues);
  console.log("loaded " + rows.length);
  if (req.query.after) {
    res.status(200).json({ data: rows, after: req.query.after });
  } else {
    res.status(200).json({ data: rows });
  }
}
