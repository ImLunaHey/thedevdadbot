import { twitchClient } from '@app/twitch-client';
import { messageHandlers } from '@app/index';
import { env } from '@app/env';

export class CommandsController {
    public static async handle() {
        const khalidsKeys = Object.keys(messageHandlers).join(', ');
        await twitchClient.say(`#${env.TWITCH_CHANNEL}`, `Available commands: ${khalidsKeys}`);
    }
}
