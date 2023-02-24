import { Client } from 'tmi.js';
import { RiddleController } from './src/controllers/RiddleController';
import { FishController } from './src/controllers/FishController';
import { LogController } from './src/controllers/LogController';
import { TwitchClientController } from './src/controllers/TwitchClientController';

const client: Client = TwitchClientController.createClient();
const fishController: FishController = new FishController();
const riddleController: RiddleController = new RiddleController(client);

client.on('message', (channel, tags, message, self) => {
    const user = tags['display-name'];
    if (!user || user === 'thedevdadbot') {
        return;
    }

    LogController.log(user, message);

    if (message.toLowerCase().includes('!fishcam')) {
        fishController.handle(message);
    }

    riddleController.handle(user, message);
});
