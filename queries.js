const q = {
  "real-time-receivers-tx-count": [
    `
    WITH q AS (
      SELECT BLOCK_TIMESTAMP,
      RECEIVER_ACCOUNT_ID,
      receipt_conversion_gas_burnt
      FROM public.transactions 
      WHERE block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      ORDER BY block_timestamp DESC 
      LIMIT $2
    )
    SELECT ROUND(BLOCK_TIMESTAMP/1e6)::text as BLOCK_TIMESTAMP,
    RECEIVER_ACCOUNT_ID,
    receipt_conversion_gas_burnt
    FROM q
    `,
    ["after", "limit"],
  ],
  "tx-frequency-hour": [
    `
    SELECT CAST(COUNT(DISTINCT transaction_hash) AS INTEGER) as COUNT, 
    to_char(to_timestamp(block_timestamp / 1e9), 'HH24')  as HOUR,
    to_char(to_timestamp(block_timestamp / 1e9), 'DD/MM/YYYY')  as DAY
    FROM public.transactions
    WHERE block_timestamp > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    GROUP BY DAY, HOUR
    LIMIT $2
    `,
    [["last", "6 hours"], ["limit"]],
  ],
  "top-receivers-tx-count": [
    `
    SELECT COUNT(DISTINCT originated_from_transaction_hash) as COUNT, 
    RECEIVER_ACCOUNT_ID 
    FROM public.receipts
    WHERE included_in_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    GROUP BY RECEIVER_ACCOUNT_ID
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "top-senders-tx-count": [
    `
    SELECT COUNT(DISTINCT originated_from_transaction_hash) as COUNT, 
    PREDECESSOR_ACCOUNT_ID 
    FROM public.receipts
    WHERE included_in_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    GROUP BY PREDECESSOR_ACCOUNT_ID
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "top-funders-receipt-count": [
    `
    SELECT COUNT(DISTINCT receipt_id) as COUNT, 
    receipt_predecessor_account_id
    FROM public.action_receipt_actions
    WHERE receipt_included_in_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    AND ACTION_KIND = 'CREATE_ACCOUNT'
    GROUP BY receipt_predecessor_account_id
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    [
      ["last", "7 days"],
      ["limit", 100],
    ],
  ],
  "real-time-account-creations": [
    `
    WITH q AS (
      SELECT receipt_included_in_block_timestamp,
     RECEIPT_RECEIVER_ACCOUNT_ID
      FROM public.action_receipt_actions 
      WHERE receipt_included_in_block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      AND ACTION_KIND = 'CREATE_ACCOUNT'
      ORDER BY receipt_included_in_block_timestamp DESC 
      LIMIT $2
    )
    SELECT ROUND(receipt_included_in_block_timestamp/1e6)::text as BLOCK_TIMESTAMP,
    RECEIPT_RECEIVER_ACCOUNT_ID AS GROUP,
    1 as SIZE
    FROM q
    `,
    ["after", "limit"],
  ],
  "real-time-account-deletions": [
    `
    WITH q AS (
      SELECT receipt_included_in_block_timestamp,
     RECEIPT_RECEIVER_ACCOUNT_ID
      FROM public.action_receipt_actions 
      WHERE receipt_included_in_block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      AND ACTION_KIND = 'DELETE_ACCOUNT'
      ORDER BY receipt_included_in_block_timestamp DESC 
      LIMIT $2
    )
    SELECT ROUND(receipt_included_in_block_timestamp/1e6)::text as BLOCK_TIMESTAMP,
    RECEIPT_RECEIVER_ACCOUNT_ID AS GROUP,
    1 as SIZE
    FROM q
    `,
    ["after", "limit"],
  ],
  "top-nft-collections-transfer-count": [
    `
    SELECT 
    COUNT(DISTINCT emitted_for_receipt_id) as COUNT, 
    emitted_by_contract_account_id
    FROM public.assets__non_fungible_token_events
    WHERE emitted_at_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    AND EVENT_KIND = 'TRANSFER'
    GROUP BY emitted_by_contract_account_id
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "top-nft-collections-mint-count": [
    `
    SELECT 
    COUNT(DISTINCT emitted_for_receipt_id) as COUNT, 
    emitted_by_contract_account_id
    FROM public.assets__non_fungible_token_events
    WHERE emitted_at_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    AND EVENT_KIND = 'MINT'
    GROUP BY emitted_by_contract_account_id
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "top-nft-collections-burn-count": [
    `
    SELECT 
    COUNT(DISTINCT emitted_for_receipt_id) as COUNT, 
    emitted_by_contract_account_id
    FROM public.assets__non_fungible_token_events
    WHERE emitted_at_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    AND EVENT_KIND = 'BURN'
    GROUP BY emitted_by_contract_account_id
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "top-individual-nft-transfer-count": [
    `
    SELECT 
    COUNT(DISTINCT emitted_for_receipt_id) as COUNT, 
    token_id || ' - ' || emitted_by_contract_account_id as NAME    
    FROM public.assets__non_fungible_token_events
    WHERE emitted_at_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    AND EVENT_KIND = 'TRANSFER'
    GROUP BY NAME
    ORDER BY COUNT DESC 
    LIMIT $2
    `,
    ["last", "limit"],
  ],
  "real-time-nft-mints": [
    `
    WITH q as (
      SELECT 
      (token_id || ' - ' || emitted_by_contract_account_id) as GROUP_NAME,
      emitted_at_block_timestamp
      FROM public.assets__non_fungible_token_events
      WHERE emitted_at_block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      AND EVENT_KIND = 'MINT'
      ORDER BY emitted_at_block_timestamp DESC 
      LIMIT $2
    )
    SELECT 
    ROUND(emitted_at_block_timestamp/1e6)::text as BLOCK_TIMESTAMP,
    GROUP_NAME AS GROUP,
    1 AS SIZE
    FROM q
    `,
    ["after", "limit"],
  ],
  "real-time-nft-burns": [
    `
    WITH q as (
      SELECT 
      (token_id || ' - ' || emitted_by_contract_account_id) as GROUP_NAME,
      emitted_at_block_timestamp
      FROM public.assets__non_fungible_token_events
      WHERE emitted_at_block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      AND EVENT_KIND = 'BURN'
      ORDER BY emitted_at_block_timestamp DESC 
      LIMIT $2
    )
    SELECT 
    ROUND(emitted_at_block_timestamp/1e6)::text as BLOCK_TIMESTAMP,
    GROUP_NAME AS GROUP,
    1 AS SIZE
    FROM q
    `,
    ["after", "limit"],
  ],
  "real-time-nft-transfers": [
    `
    WITH q as (
      SELECT 
      (token_id || ' - ' || emitted_by_contract_account_id) as GROUP_NAME,
      emitted_at_block_timestamp
      FROM public.assets__non_fungible_token_events
      WHERE emitted_at_block_timestamp > COALESCE(CAST($1 AS BIGINT), 0)
      AND EVENT_KIND = 'TRANSFER'
      ORDER BY emitted_at_block_timestamp DESC 
      LIMIT $2
    )
    SELECT 
    ROUND(emitted_at_block_timestamp/1e6)::text as BLOCK_TIMESTAMP,
    GROUP_NAME AS GROUP,
    1 AS SIZE
    FROM q
    `,
    ["after", "limit"],
  ],
  "top-types-receipt-count": [
    `
    SELECT CAST(COUNT(DISTINCT receipt_id) AS INTEGER) as COUNT, 
    ACTION_KIND
    FROM public.action_receipt_actions
    WHERE receipt_included_in_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $1::interval)) * 1e9 AS BIGINT) 
    GROUP BY ACTION_KIND
    ORDER BY COUNT DESC 
    `,
    ["last"],
  ],
  "[accountId]": [
    `
    SELECT COUNT(DISTINCT originated_from_transaction_hash) as COUNT, 
    RECEIVER_ACCOUNT_ID 
    FROM public.receipts
    WHERE PREDECESSOR_ACCOUNT_ID = $1
    AND included_in_block_timestamp
    > CAST((EXTRACT(EPOCH FROM NOW()) - EXTRACT(EPOCH FROM 
    $2::interval)) * 1e9 AS BIGINT) 
    GROUP BY RECEIVER_ACCOUNT_ID
    ORDER BY COUNT DESC 
    LIMIT $3
  `,
    ["account", "last", "limit"],
  ],
  "[hash]": [
    `
      SELECT public.execution_outcomes.RECEIPT_ID, public.execution_outcomes.GAS_BURNT FROM public.receipts 
      JOIN public.execution_outcomes
      ON public.receipts.receipt_id = public.execution_outcomes.receipt_id
      JOIN public.transactions
      ON originated_from_transaction_hash = transaction_hash
      WHERE originated_from_transaction_hash = $1
      ORDER BY included_in_block_timestamp DESC
    `,
    ["transaction"],
  ],
};

export default q;

export const defaults = {
  after: null,
  last: "1 hour",
  limit: 10,
  account: "aurora",
};
