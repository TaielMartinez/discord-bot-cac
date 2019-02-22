const Discord = require('discord.js');
const client = new Discord.Client();

client.login("NTQ3OTU4NjU3NDE0MDcwMjc1.D0-V-A.i1KiB8_Qvvjm1Iva0QZ23tdNT1I");

client.on('message', msg => {
    if (msg.content === 'ah, por cierto luk, el bot') {
      msg.reply('funciona!!!!');
    }
  });
