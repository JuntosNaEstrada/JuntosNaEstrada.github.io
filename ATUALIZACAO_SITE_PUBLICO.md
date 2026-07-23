# Atualização: site público com edição protegida

## O que muda

- `index.html` abre para qualquer visitante, sem login.
- Destinos planejados, viagens realizadas, relatos, avaliações e fotos ficam públicos.
- O botão **Área do casal** leva ao painel de gerenciamento.
- `admin.html` continua exigindo o login de Benicio e Leticia.
- Somente o usuário autenticado pode cadastrar, editar, excluir ou enviar fotos.

## Passo 1 — Atualizar o Supabase

1. Entre no projeto do Supabase usado pelo site.
2. Abra **SQL Editor**.
3. Abra o arquivo `supabase/public-read-migration.sql` deste pacote.
4. Copie todo o conteúdo, cole no SQL Editor e clique em **Run**.
5. Confirme que apareceu a mensagem de execução concluída.

Essa migração não apaga nem altera as viagens e fotografias existentes. Ela muda
somente as permissões de leitura e torna o bucket `trip-photos` público.

## Passo 2 — Atualizar o GitHub Pages

1. Envie todos os arquivos e pastas deste pacote para a raiz do repositório.
2. Substitua os arquivos de mesmo nome.
3. Aguarde alguns minutos para o GitHub Pages publicar a nova versão.

## Passo 3 — Testar

1. Abra o site em uma janela anônima: a página inicial deve aparecer sem senha.
2. Teste os filtros **Queremos conhecer** e **Já conhecemos**.
3. Abra uma viagem com fotos e confira a galeria.
4. Clique em **Área do casal**: deve aparecer a tela de login.
5. Entre e teste a edição de uma viagem.
6. Saia do painel e confirme que o site público continua acessível.

## Atenção

Depois dessa mudança, datas, relatos, avaliações e fotografias cadastradas no
site poderão ser vistas por qualquer pessoa que tenha o endereço. Não cadastrem
informações que desejem manter privadas.
