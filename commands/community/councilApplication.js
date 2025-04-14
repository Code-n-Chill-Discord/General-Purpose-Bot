const {
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Command, CommandType, customId } = require("gcommands");

new Command({
  name: "council-application",
  description: "Sends the council application embed",
  type: [CommandType.SLASH],
  defaultMemberPermissions: [PermissionFlagsBits.Administrator],
  // The function thats executed when the user uses the command.
  run: async (ctx) => {
    const embed = new EmbedBuilder()
      .setTitle("🧑‍🦱 Council Application")
      .setDescription(
        "Click the button below to fill out the application form. Our Community Council members help shape server decisions, suggest new ideas, and represent the community. If you're Level 10 or higher (or atleast 300 messages) and want to make a positive impact, we'd love to have you apply"
      )
      .setColor("#6488ea");

    const buttonRow = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setCustomId("applyCouncil")
        .setLabel("Apply")
        .setStyle(ButtonStyle.Primary),
    ]);

    await ctx.channel.send({ embeds: [embed], components: [buttonRow] });
    await ctx.reply({ content: "Application sent!", ephemeral: true });
  },
});
