require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix: string = "!!"
let previousMessage: string = '';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} `)
});

client.on('message', msg => {
    console.log(msg.content);
    if (!msg.content.startsWith(prefix)) {
        return;
    }
    if (previousMessage === msg.content.toLowerCase()) {
        msg.reply(`You already asked that you wanker`)
        return;
    }
    previousMessage = msg.content.toLowerCase()
    const parts = msg.content.split(' ') as string[];
    if (parts.length < 1) {
        return;
    }


    const command = parts[0].toLowerCase();
    parts.splice(0, 1);
    switch (command) {
        case "!!help":
            msg.reply(`pick your poison:
\`\`\`md
- caniuse: caniuse.com
- docs: devdocs.io
- g: lmgtfy.com
- so: stackoverflow.com
\`\`\``)
            break;

        case "!!caniuse":
            msg.reply(`https://caniuse.com#search=${encodeURI(parts.join(' '))}`)
            break;

        case "!!docs":
            msg.reply(`https://devdocs.io/#q=${parts.join('')}`)
            break;

        case "!!g":
            msg.reply(`https://lmgtfy.com/?q=${parts.join('+')}`)
            break

        case "!!so":
            msg.reply(`https://stackoverflow.com/search?q=${parts.join('+')}`)
            break;

        default:
            break;
    }
})

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN not found in environment variables');
}

client.login(process.env.DISCORD_BOT_TOKEN)
