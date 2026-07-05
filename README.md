# Shinji

Bot de WhatsApp desenvolvido por **@prrxkzz**.

## Requisitos

- Node.js 18 ou superior
- Google Chrome ou Chromium instalado (usado pelo whatsapp-web.js)

## Instalação

```bash
npm install
```

## Executar

```bash
npm start
```

Ao iniciar, um QR Code vai aparecer no terminal. Escaneie com o WhatsApp em
**Configurações > Aparelhos conectados > Conectar um aparelho**.

Após escanear, a sessão é salva na pasta `.wwebjs_auth`, então não é
necessário escanear novamente nas próximas execuções.

## Comandos

### !youtube <palavras-chave>
Busca no YouTube pelo termo informado e envia o vídeo mais relevante,
com título, thumbnail, descrição e o vídeo em si.

Exemplo:
```
!youtube Jazzghost Terror
```

### !pinterest <url1, url2, ...>
Baixa e envia as imagens das urls do Pinterest informadas, separadas por
vírgula. Limite de 8 urls por vez.

Exemplo:
```
!pinterest https://pin.it/exemplo1, https://pin.it/exemplo2
```

### !ping
Mostra a disponibilidade e a latência atual do bot.

### !s
Transforma uma imagem em figurinha. Pode ser usado como legenda de uma
imagem enviada, ou respondendo a uma imagem já enviada na conversa.

## Observações

- As bibliotecas utilizadas são gratuitas e não exigem chave de API.
- Vídeos muito grandes podem não ser enviados devido ao limite de tamanho
  de arquivos do WhatsApp.
