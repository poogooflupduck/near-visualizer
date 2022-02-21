import { query } from "@/utils/indexer";

export default async function handler(req, res) {
  let limit = req.query.limit ? `LIMIT ${req.query.limit}` : `LIMIT 10`;
  const queryText = `
    SELECT COUNT(DISTINCT originated_from_transaction_hash) as COUNT, RECEIVER_ACCOUNT_ID FROM public.receipts
     WHERE included_in_block_timestamp > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM interval'${
       req.query.last ? req.query.last : "1 hour"
     }')) * 1e9 AS BIGINT) 
     GROUP BY RECEIVER_ACCOUNT_ID
    ORDER BY COUNT DESC 
    LIMIT ${req.query.limit ? req.query.limit : "10"}
    `;
  const { rows } = await query(queryText);

  res.status(200).json({ data: rows });
}
