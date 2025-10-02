-- Allow authenticated users to insert mines during signup
CREATE POLICY "Authenticated users can create mines"
ON public.mines
FOR INSERT
TO authenticated
WITH CHECK (true);