import { RiddleController } from './controllers/RiddleController';
import { FishController } from './controllers/FishController';
import { logger } from './logger';
import { twitchClient } from './twitch-client';
import { SpecsController } from '@app/controllers/SpecsController';
import { CommandsController } from './controllers/CommandsController';
import { env } from '@app/env';

export const messageHandlers = {
    '!fishcam': FishController.handle,
    '!riddle': RiddleController.handle,
    '!specs': SpecsController.handle,
    '!commands': CommandsController.handle,
} satisfies Record<string, (message: string, username: string) => Promise<void>>;

const app = async () => {
    logger.log('Starting up...');

    // Add a listener for when a message is received
    twitchClient.on('message', (_channel, state, message) => {
        try {
            const username = state['display-name'];

            // Ignore messages from the bot
            if (!username || username === env.TWITCH_CHANNEL) return;

            // Log the message and who sent it
            logger.logChat(username, message);

            // Get the command from the message
            const command = message.split(' ')[0] as keyof typeof messageHandlers;

            // If this is a command we know about, handle it
            if (messageHandlers[command]) void messageHandlers[command](message, username);
            else void messageHandlers['!riddle'](message, username);
        } catch (error) {
            if (error instanceof Error) logger.error(error.message);
            else logger.error(`Unhandled error: ${String(error)}`);
        }
    });

    // Connect to Twitch
    await twitchClient.connect();
    logger.log('Connected to Twitch');
};

app().catch(error => {
    if (error instanceof Error) logger.error(error.message);
    else logger.error(`Unhandled error: ${String(error)}`);
    process.exit(1);
});
