import { RiddleController } from '@app/controllers/RiddleController';
import { env } from '@app/env';
import { twitchClient } from '@app/twitch-client';

jest.mock('@app/twitch-client');

describe('RiddleController', () => {
    describe('handle', () => {
        it('should return a riddle', async () => {
            const mockedSay = jest.mocked(twitchClient.say);
            await RiddleController.handle('!riddle', 'randomUser');
            expect(mockedSay).toHaveBeenCalledWith(`#${env.TWITCH_CHANNEL}`, 'daily riddle: What is the object-oriented way to become wealthy?');
        });
    });
});
