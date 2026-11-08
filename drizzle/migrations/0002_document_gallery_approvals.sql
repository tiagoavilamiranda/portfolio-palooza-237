CREATE TABLE public.portfolio_documents (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 title text NOT NULL,
 category text NOT NULL CHECK (category IN ('Diploma','Certificado','Conquista')),
 institution text NOT NULL DEFAULT '',
 description text NOT NULL DEFAULT '',
 preview_paths text[] NOT NULL DEFAULT '{}',
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portfolio_documents TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.portfolio_documents TO authenticated;
GRANT ALL ON public.portfolio_documents TO service_role;
ALTER TABLE public.portfolio_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public sanitized document gallery" ON public.portfolio_documents FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Owner manages documents" ON public.portfolio_documents FOR ALL TO authenticated USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br') WITH CHECK (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');

CREATE TABLE public.document_access_requests (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 document_id uuid NOT NULL REFERENCES public.portfolio_documents(id) ON DELETE CASCADE,
 user_id uuid NOT NULL,
 requester_name text NOT NULL,
 requester_email text NOT NULL,
 reason text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','denied','revoked')),
 created_at timestamptz NOT NULL DEFAULT now(),
 UNIQUE(document_id, user_id)
);
GRANT SELECT, INSERT, UPDATE ON public.document_access_requests TO authenticated;
GRANT ALL ON public.document_access_requests TO service_role;
ALTER TABLE public.document_access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Requester or owner reads requests" ON public.document_access_requests FOR SELECT TO authenticated USING (user_id = auth.uid() OR lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Verified requester asks for access" ON public.document_access_requests FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid() AND lower(requester_email) = lower(auth.jwt()->>'email') AND status = 'pending');
CREATE POLICY "Owner decides access" ON public.document_access_requests FOR UPDATE TO authenticated USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br') WITH CHECK (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');

CREATE TABLE public.document_original_files (
 document_id uuid PRIMARY KEY REFERENCES public.portfolio_documents(id) ON DELETE CASCADE,
 storage_path text NOT NULL UNIQUE,
 filename text NOT NULL
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.document_original_files TO authenticated;
GRANT ALL ON public.document_original_files TO service_role;
ALTER TABLE public.document_original_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owner or approved requester reads original record" ON public.document_original_files FOR SELECT TO authenticated USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br' OR EXISTS (SELECT 1 FROM public.document_access_requests r WHERE r.document_id = document_original_files.document_id AND r.user_id = auth.uid() AND r.status = 'approved'));
CREATE POLICY "Owner manages original records" ON public.document_original_files FOR ALL TO authenticated USING (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br') WITH CHECK (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');

CREATE POLICY "Public reads sanitized previews only" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'document-previews');
CREATE POLICY "Owner uploads document files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id IN ('document-previews','document-originals') AND lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Owner updates document files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id IN ('document-previews','document-originals') AND lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br') WITH CHECK (bucket_id IN ('document-previews','document-originals') AND lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Owner deletes document files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id IN ('document-previews','document-originals') AND lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br');
CREATE POLICY "Owner or approved requester reads original object" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'document-originals' AND (lower(auth.jwt()->>'email') = 'tiagooavila@yahoo.com.br' OR EXISTS (SELECT 1 FROM public.document_original_files f WHERE f.storage_path = storage.objects.name)));
