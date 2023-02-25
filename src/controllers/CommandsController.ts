import { twitchClient } from '@app/twitch-client';
import { messageHandlers } from '@app/index';

export class CommandsController {
    public static async handle() {
        const khalidsKeys = Object.keys(messageHandlers).join(', ');
        await twitchClient.say('#thedevdad_', `Available commands: ${khalidsKeys}`);
    }
}
