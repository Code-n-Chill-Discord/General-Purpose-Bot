// Command to start member of the week tournament. It sets the mowTournamentStatus to true in the config file

const { Command, CommandType, MessageEmbed } = require('gcommands');
const mowTournamentStatus = require('../utils/mowTournamentStatus');
const xpUser = require('../schemas/xpUser');
const xpConfig = require('../schemas/xpConfig');

new Command({
    name: 'startmow',
    description: 'Starts the member of the week tournament',
    type: [CommandType.SLASH],
    run: async (ctx) => {
        try {

            if (await mowTournamentStatus() === true) {
                return ctx.reply({ content: 'Member of the week tournament has already started' });
            }

            const xpConfigDoc = await xpConfig.findById('config');
            if (xpConfigDoc) {
                xpConfigDoc.mowTournamentStatus = true;
                await xpConfigDoc.save();
            } else {
                await xpConfig.create({ _id: 'config', mowTournamentStatus: true });
            }

            ctx.reply({ content: 'Member of the week tournament has started' });
        } catch (err) {
            console.error(err);
            ctx.reply({ content: 'An error occurred while trying to start the member of the week tournament' });
        }
    }
});