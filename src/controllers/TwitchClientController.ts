import { Client } from 'tmi.js';
import * as dotenv from 'dotenv';

export class TwitchClientController {
    public static createClient(): Client {
        dotenv.config();

        const client = new Client({
            connection: {
                secure: true,
                reconnect: true,
            },
            identity: {
                username: 'thedevdadbot',
                password: process.env.ACCESS_TOKEN,
            },
            channels: ['thedevdad_'],
        });

        client.connect();

        return client;
    }
}
