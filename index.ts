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
- xkcd: xkcd.com (by number)
\`\`\``)
            break;

        case "!!caniuse":
            msg.channel.send({
                content: `https://caniuse.com#search=${encodeURI(parts.join(' '))}`
            })
            break;

        case "!!docs":
            // msg.reply(`https://devdocs.io/#q=${parts.join('')}`)
            msg.channel.send({
                content: `https://devdocs.io/#q=${parts.join('')}`
            })
            break;

        case "!!g":
            msg.channel.send({
                content: `https://lmgtfy.com/?q=${parts.join('+')}`
            })
            break

        case "!!so":
            msg.channel.send({
                content: `https://stackoverflow.com/search?q=${parts.join('+')}`
            })
            break;
        case "!!xkcd":
            const comic = Number(parts[0]);
            if (comic >= 0) {
                msg.channel.send({
                    content: `https://xkcd.com/${comic}/`
                })
            } else {
                msg.channel.send({
                    content: `I'm expecting a number to a comic. Try again.
          https://media.giphy.com/media/d2VNGdRDbD3baHte/giphy.gif
          `
                })
            }
            break;
        default:
            msg.channel.send({
                content: `...I have no idea what you're asking??...
        https://media.giphy.com/media/aZ3LDBs1ExsE8/giphy.gif
        `
            })
            break;
    }
})

if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error('DISCORD_BOT_TOKEN not found in environment variables');
}

client.login(process.env.DISCORD_BOT_TOKEN)
