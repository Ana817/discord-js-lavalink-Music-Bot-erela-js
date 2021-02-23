const config = require("../../botconfig/config.json");
module.exports = {
    name: "react",
    category: "⛔️ Administration",
    aliases: ["delete"],
    description: "Closes the ticket",
    useage: "react <msgid> <Emoji>",
    memberpermissions: ["MANAGE_GUILD"],
    run: async (client, message, args, cmduser, text, prefix) => {
    try {
      if(!args[0])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Please Include a MessageID`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ✅\``)
        );
      if(args[0].length != 18)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Please Include a Valid MessageID`)
        );

      if(!args[1])
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Please Include a Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ✅\``)
        );

      let emoji = args[1];
      if(emoji.length == 18) emoji = message.guild.emojis.cache.get(args[0]);
      if(!emoji)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | Please Include a valid Emoji`)
            .setDescription(`Usage: \`${prefix}react <msgid> <Emoji>\`\nExample: \`${prefix}react 442355791412854784 ✅\``)
        );

      message.channel.messages.fetch(args[0])
          .then((msg) => msg.react(args[1]).catch((e) => console.log(String(e.stack).red)))
          .catch((e) => console.log(String(e.stack).red));
    } catch (e) {
        console.log(String(e.stack).bgRed)
        return message.channel.send(new MessageEmbed()
            .setColor(ee.wrongcolor)
						.setFooter(ee.footertext, ee.footericon)
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.stack}\`\`\``)
        );
    }
  }
};
