const {MessageEmbed} = require("discord.js")
const config = require("../../botconfig/config.json")
const ee = require("../../botconfig/embed.json")
module.exports = {
    name: "jump",
    category: "🎶 Music",
    aliases: ["skipto"],
    description: "Skips to a specific Track",
    usage: "skipto <Trackindex>",
    run: async(client, message, args, cmduser, text, prefix) => {
    try{
      //get the channel instance from the Member
      const { channel } = message.member.voice;
      //if the member is not in a channel, return
      if (!channel)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle("❌ Error | You need to join a voice channel.")
        );
      //get the player instance
      const player = client.manager.players.get(message.guild.id);
      //if no player available return error | aka not playing anything
      if (!player)
        return message.channel.send(new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(client.user.username, ee.footericon)
          .setTitle("❌ Error | There is nothing playing")
        );
      //if not in the same channel as the player, return Error
      if (channel.id !== player.voiceChannel)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | You need to be in my voice channel to use this command!")
          .setDescription(`Channelname: \`${message.guild.channels.cache.get(player.voiceChannel).name}\``)
        );
      //if no args send error plus example
      if(!args[0])
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | Please include to which track you want to jump")
          .setDescription(`Example: \`jump ${player.queue.size - 2 <= 0 ? player.queue.size : player.queue.size - 2 }\``)
        );
      return message.channel.send("Please include a track Usage: `removetrack <Trackindex>` e.g: `removetrack 3`")
      //if userinput is not a Number
      if(isNaN(args[0]))
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | It has to be a queue **Number**")
        );
      //if the wished track is bigger then the Queue Size
      if(Number(args[0]) > player.queue.size)
        return message.channel.send(new MessageEmbed()
          .setFooter(ee.footertext, ee.footericon)
          .setColor(ee.wrongcolor)
          .setTitle("❌ Error | That song is not in the queue, sorry!")
        );
      //remove all tracks to the jumped song
      player.queue.remove(0, Number(args[0]) - 1);
      //stop the player
      player.stop()
      //Send Success Message
      return message.channel.send(new MessageEmbed()
        .setTitle(`✅ Success | Jumped to the: \`${args[0]}\` Song`)
        .setDescription(`⏭ Skipped \`${Number(args[0])}\` Songs`)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
      );
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
