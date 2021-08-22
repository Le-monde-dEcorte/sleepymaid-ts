import { BotCommand } from '../../lib/extensions/BotCommand'
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from 'discord.js'
import { colorRole } from '../../config/lists'
import { config } from '../../config/config'
export default class color_message_command extends BotCommand {
	constructor() {
		super('color_message_setup', {
			aliases: ['color_message_setup'],
			prefix: config.devprefix,
			ownerOnly: true,
			channel: 'guild'
		})
	}

	async exec(message) {
		// eslint-disable-next-line prefer-const
		let roleArray: string[] = []
		colorRole.forEach((rolename) => {
			const role = message.guild.roles.cache.find(
				(role) => role.name === rolename
			)
			const rolePingString = `<@&${role.id}>\n`
			roleArray.push(rolePingString)
		})
		const displayRoleString = roleArray.join(' ')
		const embed = new MessageEmbed()
			.setColor('#36393f')
			.setTitle('Choix de couleur.')
			.setDescription(
				'Clique sur un bouton pour avoir la couleur de ton choix.'
			)
			.addField('Rôle de couleur', displayRoleString, true)

		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('color_role_selects')
				.setPlaceholder('Aucune couleur')
				.addOptions([
					{
						label: 'Aucune couleur',
						value: 'nothing'
					},
					{
						label: 'Maya',
						value: 'Maya'
					},
					{
						label: 'Mikado',
						value: 'Mikado'
					},
					{
						label: 'Rose',
						value: 'Rose'
					},
					{
						label: 'Lavender',
						value: 'Lavender'
					},
					{
						label: 'Coral',
						value: 'Coral'
					},
					{
						label: 'Cantaloupe',
						value: 'Cantaloupe'
					},
					{
						label: 'Mint',
						value: 'Mint'
					},
					{
						label: 'Weed',
						value: 'Weed'
					},
					{
						label: 'Smoked',
						value: 'Smoked'
					}
				])
		)
		message.channel.send({ embeds: [embed], components: [row] })
	}
}
