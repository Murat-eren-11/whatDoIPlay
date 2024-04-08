const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
require("dotenv").config();

let jeux = [];

client.once("ready", () => {
  console.log("Prêt!");
});

client.on("messageCreate", async (message) => {
  if (!message.content.startsWith("/") || message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "addgames") {
    const nomDesJeux = args.join(" ");
    jeux.push(nomDesJeux);
    await message.channel.send(`\`${nomDesJeux}\` ajouté à la liste.`);
  } else if (command === "cleargames") {
    jeux = [];
    await message.channel.send("La liste des jeux a été vidée.");
  } else if (command === "removegame") {
    const nomDuJeu = args.join(" ");
    jeux = jeux.filter((jeu) => jeu !== nomDuJeu);
    await message.channel.send(`\`${nomDuJeu}\` supprimé de la liste.`);
  } else if (command === "whatdoiplay") {
    if (jeux.length === 0) {
      await message.channel.send("Aucun jeu dans la liste.");
    } else {
      const jeuAleatoire = jeux[Math.floor(Math.random() * jeux.length)];
      await message.channel.send(
        `Pourquoi ne pas jouer à \`${jeuAleatoire}\` ?`
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

module.exports = { startDiscordBot };
