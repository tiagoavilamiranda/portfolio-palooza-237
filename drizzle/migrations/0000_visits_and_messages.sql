CREATE TABLE public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  path text NOT NULL DEFAULT '/',
  source text,
  referrer text,
  city text,
  region text,
  country text,
  device text
);
GRANT SELECT, DELETE ON public.site_visits TO authenticated;
GRANT ALL ON public.site_visits TO service_role;
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner reads visits" ON public.site_visits FOR SELECT TO authenticated
  USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Owner deletes visits" ON public.site_visits FOR DELETE TO authenticated
  USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');

CREATE TABLE public.visitor_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  company text,
  contact text,
  message text NOT NULL
);
GRANT SELECT, DELETE ON public.visitor_messages TO authenticated;
GRANT ALL ON public.visitor_messages TO service_role;
ALTER TABLE public.visitor_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner reads messages" ON public.visitor_messages FOR SELECT TO authenticated
  USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Owner deletes messages" ON public.visitor_messages FOR DELETE TO authenticated
  USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');