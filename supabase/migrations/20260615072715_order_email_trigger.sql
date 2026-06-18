
CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;

CREATE OR REPLACE FUNCTION notify_order_email()
RETURNS TRIGGER AS $$
DECLARE
  project_url TEXT;
  anon_key TEXT;
BEGIN
  SELECT value INTO project_url FROM vault.secrets WHERE name = 'SUPABASE_URL' LIMIT 1;
  SELECT value INTO anon_key FROM vault.secrets WHERE name = 'SUPABASE_ANON_KEY' LIMIT 1;

  IF project_url IS NOT NULL AND anon_key IS NOT NULL THEN
    PERFORM extensions.http_post(
      url := project_url || '/functions/v1/send-order-email',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || anon_key
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_created
  AFTER INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION notify_order_email();
