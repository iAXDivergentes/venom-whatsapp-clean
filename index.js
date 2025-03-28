const venom = require('venom-bot');
const axios = require('axios');

venom
  .create({
    session: 'bot',
    logQR: true,
    headless: true,
  })
  .then((client) => start(client))
  .catch((err) => console.error(err));

function start(client) {
  client.onMessage(async (message) => {
    if (message.fromMe || !message.body) return;

    const webhook = 'https://hook.us1.make.com/COLE_SEU_WEBHOOK_AQUI';

    try {
      await axios.post(webhook, {
        from: message.from,
        name: message.sender?.name || 'sem nome',
        message: message.body,
      });
      console.log('Mensagem enviada ao Make com sucesso!');
    } catch (err) {
      console.error('Erro ao enviar ao Make:', err.message);
    }
  });
}
