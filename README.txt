# Quiz COPEL — protótipo

## Arquivos
- `index.html`: apresentação, cadastro, jogo e resultado.
- `style.css`: visual preto/laranja, animações e responsividade.
- `script.js`: perguntas, lógica do jogo e gravação do histórico.
- `admin.html`: visualização e exportação do histórico.

## Como testar
Abra `index.html` no navegador.

O histórico desta versão é salvo no `localStorage` do navegador. Isso é proposital para o protótipo: se duas pessoas acessarem o site de computadores diferentes, elas NÃO compartilharão o mesmo histórico.

## Para colocar em produção
Para o requisito de "histórico de todos que responderam", substitua o `localStorage` por um banco online/API. Uma opção simples para um projeto pequeno é Supabase ou Firebase.

Também é recomendado proteger a área administrativa com autenticação. Apenas esconder o link `admin.html` não é segurança.

## Personalização
As perguntas estão no início de `script.js`, no array `questions`. Para adicionar/remover perguntas, edite esse array.

A imagem de rede usada na apresentação vem do Unsplash. Para um site corporativo real, substitua por imagens que você tenha autorização para utilizar, preferencialmente imagens oficiais disponibilizadas pela COPEL.
