import { twitchClient } from '@app/twitch-client';
import { exec } from 'child_process';
import { messageHandlers } from '..';

export class CommandsController {
    public static async handle() {
        const khalidsKeys = Object.keys(messageHandlers).join(', ');
        await twitchClient.say('#thedevdad_', `Available commands: ${khalidsKeys}`);
    }
}
