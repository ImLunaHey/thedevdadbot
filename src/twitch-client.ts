import { env } from '@app/env';
import { Client } from 'tmi.js';

export const twitchClient = new Client({
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: env.TWITCH_USERNAME,
        password: env.TWITCH_ACCESS_TOKEN,
    },
    channels: [env.TWITCH_CHANNEL],
});
