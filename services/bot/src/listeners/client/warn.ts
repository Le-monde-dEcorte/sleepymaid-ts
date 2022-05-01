import { Listener } from '@sleepymaid/handler'
import { BotClient } from '../../lib/extensions/BotClient'

export default new Listener(
	{
		name: 'warn',
		once: false
	},
	{
		run(info, client: BotClient) {
			return client.logger.debug(info)
		}
	}
)
