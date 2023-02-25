import { RiddleController } from '@app/controllers/RiddleController';
import { twitchClient } from '@app/twitch-client';

jest.mock('@app/twitch-client');

describe('RiddleController', () => {
    describe('handle', () => {
        it('should return a riddle', async () => {
            const say = jest.mocked(twitchClient.say);
            await RiddleController.handle('!riddle', 'randomUser');
            expect(say).toHaveBeenCalledWith('#thedevdad_', 'daily riddle: what goes up but never comes down?');
        });
    });
});
