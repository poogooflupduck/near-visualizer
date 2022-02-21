import { query } from "@/utils/indexer";

export default async function handler(req, res) {
  const { rows } = await query(
    `      
    SELECT ROUND(receipt_included_in_block_timestamp/1e6)::text as BLOCK,
    RECEIPT_RECEIVER_ACCOUNT_ID as GROUP,
    1 as SIZE
    FROM public.action_receipt_actions  
    WHERE ACTION_KIND = 'CREATE_ACCOUNT'      
    ORDER BY BLOCK DESC
    LIMIT 10 
      `
  );
  console.log(rows);
  res.status(200).json({ data: rows });
}
