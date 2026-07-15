# Site — Movere Fisioterapia e Reabilitação Animal

Site estático (HTML/CSS/JS puro, sem build, sem dependências de servidor) pronto para hospedar no GitHub Pages.

## Estrutura

```
movere-site/
├── index.html        → todo o conteúdo e seções do site
├── css/style.css      → visual (cores, tipografia, layout)
├── js/script.js        → menu mobile, animações e o formulário de agendamento
├── assets/
│   ├── storefront.jpg   → foto da fachada
│   └── favicon.svg      → ícone da aba do navegador
└── README.md
```

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub (ex: `movere-site`).
2. Envie todos os arquivos desta pasta para a raiz do repositório (mantendo as pastas `css/`, `js/` e `assets/`).
3. No repositório, vá em **Settings → Pages**.
4. Em **Source**, selecione a branch `main` e a pasta `/ (root)`. Salve.
5. Em alguns minutos o GitHub mostrará o link do site, algo como:
   `https://SEU-USUARIO.github.io/movere-site/`

Não é necessário nenhum passo de build — é só HTML/CSS/JS puro, então o GitHub Pages serve os arquivos exatamente como estão.

## Sobre o agendamento (importante)

O GitHub Pages **não hospeda servidor nem banco de dados** — é hospedagem 100% estática. Por isso, o formulário de "Agendar consulta" funciona assim, sem depender de nenhum backend e sem risco de quebrar:

1. A pessoa escolhe data e horário de preferência (dias úteis, exceto domingo, das 08:00 às 18:00) e preenche seus dados.
2. Ao enviar, o site monta uma mensagem organizada e abre o WhatsApp da clínica (`+55 62 99621-1942`) já com o texto preenchido.
3. A confirmação final do horário continua sendo feita pela equipe da Movere, respondendo naquela conversa.

Isso evita duas coisas que normalmente dão problema em agendas "online" gratuitas hospedadas em site estático: exigir um banco de dados que o GitHub Pages não tem, e permitir que dois tutores marquem o mesmo horário sem ninguém confirmar. Se no futuro vocês quiserem uma agenda com horários realmente ocupados/livres em tempo real (para evitar conflitos automaticamente), isso exige um serviço externo simples (ex: Google Calendar, Calendly, Cal.com) conectado ao site — posso integrar um desses quando vocês decidirem qual preferem.

## O que personalizar

- **Telefone do WhatsApp**: variável `WHATSAPP_NUMBER` no topo de `js/script.js`.
- **Textos e serviços**: diretamente em `index.html`.
- **Cores**: no topo de `css/style.css`, dentro de `:root`.
- **Mapa**: o endereço já está embutido no `iframe` da seção "Local"; troque a query da URL se o endereço mudar.
- **Foto da fachada**: substitua `assets/storefront.jpg` por uma foto em melhor resolução quando tiverem uma disponível.
