const { Component, ComponentType } = require("gcommands");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

// Define a new component for the "createMail" button
new Component({
  name: "applyCouncil",
  type: [ComponentType.BUTTON],
  run: async (ctx) => {
    try {
      console.log("Hey! from council app");
      // Create the modal
      const modal = new ModalBuilder()
        .setCustomId("councilApplicationModal")
        .setTitle("Member Council Application");

      // Add components to modal

      const serverFeedbackInput = new TextInputBuilder()
        .setCustomId("serverFeedbackInput")
        .setLabel("Favorite server aspect? One big improvement?")
        .setStyle(TextInputStyle.Paragraph);

      const applicationReasonInput = new TextInputBuilder()
        .setCustomId("applicationReasonInput")
        .setLabel("Why do you want to join the council?")
        .setStyle(TextInputStyle.Paragraph);

      const uniqueSkillInput = new TextInputBuilder()
        .setCustomId("uniqueSkillInput")
        .setLabel("What special skill/perspective can you bring?")
        .setStyle(TextInputStyle.Paragraph);

      const addFeatureInput = new TextInputBuilder()
        .setCustomId("addFeatureInput")
        .setLabel("One feature you would add to the server?")
        .setStyle(TextInputStyle.Paragraph);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(
        serverFeedbackInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        applicationReasonInput
      );
      const thirdActionRow = new ActionRowBuilder().addComponents(
        uniqueSkillInput
      );
      const fourthActionRow = new ActionRowBuilder().addComponents(
        addFeatureInput
      );

      // Add inputs to the modal
      modal.addComponents(
        firstActionRow,
        secondActionRow,
        thirdActionRow,
        fourthActionRow
      );

      // Show the modal to the user
      await ctx.interaction.showModal(modal);
    } catch (error) {
      console.log(error);
    }
  },
});
