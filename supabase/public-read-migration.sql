-- Execute este arquivo UMA VEZ no SQL Editor do projeto Supabase atual.
-- Ele libera somente a leitura pública. Criar, editar e excluir continuam
-- restritos ao proprietário autenticado pelas políticas já existentes.

drop policy if exists "owner reads trips" on public.trips;
drop policy if exists "public reads trips" on public.trips;
create policy "public reads trips"
on public.trips for select
to anon, authenticated
using (true);

drop policy if exists "owner reads photos" on public.trip_photos;
drop policy if exists "public reads photo records" on public.trip_photos;
create policy "public reads photo records"
on public.trip_photos for select
to anon, authenticated
using (true);

update storage.buckets
set public = true
where id = 'trip-photos';

-- As políticas de upload e exclusão continuam verificando auth.uid().
