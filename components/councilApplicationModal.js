const { Component, ComponentType } = require("gcommands");
const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");

// Define a new component for the "createMail" button
new Component({
  name: "councilApplicationModal",
  type: [ComponentType.MODAL],
  run: async (ctx) => {
    try {
      if (!ctx.interaction.isModalSubmit()) return;
      if (ctx.interaction.customId !== "councilApplicationModal") return;

      const serverFeedbackInput = ctx.interaction.fields.getTextInputValue(
        "serverFeedbackInput"
      );
      const applicationReasonInput = ctx.interaction.fields.getTextInputValue(
        "applicationReasonInput"
      );
      const uniqueSkillInput =
        ctx.interaction.fields.getTextInputValue("uniqueSkillInput");
      const addFeatureInput =
        ctx.interaction.fields.getTextInputValue("addFeatureInput");

      await ctx.interaction.reply({
        content: `Thanks for your application! We'll get back to you soon!`,
        ephemeral: true,
      });

      // Send application to applications channel
      const applicationsChannel = await ctx.guild.channels.fetch(
        config.discord.applicationsChannelId
      );

      const applicationEmbed = new EmbedBuilder()
        .setTitle(`🧑‍🦱 Council Application`)
        .setDescription(
          `**Aplicant**\n` +
            `${ctx.user} (${ctx.user.globalName})\n\n` +
            `**Favorite server aspect? One big improvement?**\n` +
            `\`\`\`${serverFeedbackInput}\`\`\`\n\n` +
            `**Why do you want to join the council?**\n` +
            `\`\`\`${applicationReasonInput}\`\`\`\n\n` +
            `**What special skill/perspective can you bring?**\n` +
            `\`\`\`${uniqueSkillInput}\`\`\`\n\n` +
            `**One feature you would add to the server?**\n` +
            `\`\`\`${addFeatureInput}\`\`\``
        )
        .setColor("#6488ea")
        .setTimestamp();

      await applicationsChannel.send({ embeds: [applicationEmbed] });
    } catch (error) {
      console.log(error);
    }
  },
});
