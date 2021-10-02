import { GuildMember, Guild } from 'discord.js'
import { config } from '../config/config'
import { BotClient } from '../lib/extensions/BotClient'
import { mondecorteModel } from '../lib/utils/db'

export async function checkActifRole(
	member: GuildMember,
	guild: Guild,
	points: number,
	client: BotClient
) {
	const userRole = member.roles.cache.map((role) => role.id)

	if (member.id === guild.ownerId) return
	if (member.user.bot) return

	if (points >= 100) {
		if (!userRole.includes('842387653394563074')) {
			const actifRole = guild.roles.cache.find(
				(role) => role.id === '842387653394563074'
			)
			if (config.isProduction) {
				await member.roles.add(actifRole)
			} else if (config.isDevelopment) {
				client.logger.debug(
					`${member.user.tag} (${member.id}) got actif role but not added because bot is in dev env`
				)
			}
		}
	}

	if (points <= 50) {
		if (userRole.includes('842387653394563074')) {
			const actifRole = guild.roles.cache.find(
				(role) => role.id === '842387653394563074'
			)
			if (config.isProduction) {
				await member.roles.remove(actifRole)
			} else if (config.isDevelopment) {
				client.logger.debug(
					`${member.user.tag} (${member.id}) got remove actif role but not remove because bot is in dev env`
				)
			}
		}
	}
}

export async function checkUserActivityPoints(user: GuildMember) {
	const userInDb = await mondecorteModel.findOne({ id: user.id })
	return userInDb?.points || 0
}
