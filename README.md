# Benicio & Leticia na Estrada

Site público de viagens para publicação no GitHub Pages. Visitantes podem ver destinos, memórias e fotografias; somente o casal autenticado pode cadastrar, editar ou excluir conteúdo.

## 1. Criar e configurar o Supabase

1. Crie um projeto gratuito em `supabase.com`.
2. Para um projeto novo, abra **SQL Editor**, cole todo o conteúdo de `supabase/setup.sql` e execute uma única vez.
3. Em **Authentication → Users**, crie um usuário manualmente. Use um e-mail interno, por exemplo `benicio-leticia@exemplo.local`, e escolha a senha compartilhada do casal.
4. Em **Authentication → URL Configuration**, adicione a URL do GitHub Pages em **Redirect URLs**.
5. Em **Project Settings → API**, copie a `Project URL` e a chave `anon/public`.

## 2. Preencher a configuração

Edite `config.js`:

- `SUPABASE_URL`: Project URL;
- `SUPABASE_ANON_KEY`: chave anon/public;
- `AUTH_EMAIL`: exatamente o e-mail do usuário criado;
- `DISPLAY_USERNAME`: mantenha `Benicio e Leticia`.

A chave anon pode permanecer no site. A segurança real é garantida pela autenticação e pelas políticas RLS. Nunca use a chave `service_role` no GitHub.

## 3. Publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz do repositório.
2. Em **Settings → Pages**, selecione **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Abra a URL publicada. A página pública mostrará destinos, memórias e fotos sem exigir login.
4. Para editar, clique em **Área do casal** e entre com `Benicio e Leticia` e a senha cadastrada no Supabase.
5. No painel, clique em **Importar os 100 destinos** quando necessário. O comando não duplica registros existentes.

## Migrar o projeto atual de privado para público

1. No Supabase, abra **SQL Editor**.
2. Execute uma única vez o conteúdo de `supabase/public-read-migration.sql`.
3. Publique todos os arquivos deste pacote no GitHub Pages.
4. Teste a página principal em uma janela anônima. Ela deve abrir sem login.
5. Clique em **Área do casal**: o painel deve redirecionar para o login.

## Privacidade

Destinos, datas, relatos e fotografias são públicos. As operações de criação, alteração, upload e exclusão continuam protegidas por autenticação e RLS. Não publique informações pessoais que vocês não desejem compartilhar.
