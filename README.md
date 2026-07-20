# Benicio & Leticia na Estrada

Site privado de viagens para publicação no GitHub Pages. Inclui os 100 destinos do documento, autenticação, painel de gerenciamento e armazenamento privado de fotos no Supabase.

## 1. Criar e configurar o Supabase

1. Crie um projeto gratuito em `supabase.com`.
2. Abra **SQL Editor**, cole todo o conteúdo de `supabase/setup.sql` e execute uma única vez.
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
3. Abra a URL publicada. A primeira página será a tela de senha.
4. Entre com `Benicio e Leticia` e a senha cadastrada no Supabase.
5. Abra **Gerenciar viagens** e clique em **Importar os 100 destinos**. O comando não duplica registros existentes.

## Privacidade

O conteúdo do repositório GitHub pode ser público, mas destinos cadastrados, registros, datas, relatos e fotografias ficam no Supabase com acesso limitado ao usuário autenticado. Para ocultar também os arquivos visuais e o código-fonte, use repositório privado com um serviço de hospedagem que aceite GitHub privado. O GitHub Pages não torna o HTML de um site publicado verdadeiramente privado.
