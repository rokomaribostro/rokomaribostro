-- 1. Recreate notify_order_email with a fixed search_path so it is no longer mutable.
--    Also mark SECURITY DEFINER explicitly and lock down search_path to empty string
--    so no schema-injection is possible. Fully-qualified names are used throughout.
CREATE OR REPLACE FUNCTION public.notify_order_email()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  project_url TEXT;
  anon_key    TEXT;
BEGIN
  SELECT value INTO project_url
    FROM vault.secrets
   WHERE name = 'SUPABASE_URL'
   LIMIT 1;

  SELECT value INTO anon_key
    FROM vault.secrets
   WHERE name = 'SUPABASE_ANON_KEY'
   LIMIT 1;

  IF project_url IS NOT NULL AND anon_key IS NOT NULL THEN
    PERFORM extensions.http_post(
      url     := project_url || '/functions/v1/send-order-email',
      headers := jsonb_build_object(
                   'Content-Type',  'application/json',
                   'Authorization', 'Bearer ' || anon_key
                 ),
      body    := jsonb_build_object('record', row_to_json(NEW))
    );
  END IF;

  RETURN NEW;
END;
$$;

-- 2. Revoke EXECUTE on the trigger function from every non-superuser role.
--    It is a trigger function and must never be callable via RPC.
REVOKE EXECUTE ON FUNCTION public.notify_order_email() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_order_email() FROM anon;
REVOKE EXECUTE ON FUNCTION public.notify_order_email() FROM authenticated;

-- 3. Replace the always-true INSERT policy with one that enforces the
--    invariant that newly created orders must have status = 'pending'.
--    This prevents anonymous callers from setting arbitrary status values.
DROP POLICY IF EXISTS "insert_orders" ON public.orders;

CREATE POLICY "insert_orders" ON public.orders
  FOR INSERT
  TO anon
  WITH CHECK (status = 'pending');
