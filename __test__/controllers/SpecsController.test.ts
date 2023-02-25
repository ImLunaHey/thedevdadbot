import { SpecsController } from '@app/controllers/SpecsController';
import { env } from '@app/env';
import { twitchClient } from '@app/twitch-client';
import { outdent } from 'outdent';

jest.mock('@app/twitch-client');

describe('SpecsController', () => {
    describe('handle', () => {
        it('should return the pc specs', async () => {
            const mockedSay = jest.mocked(twitchClient.say);
            SpecsController.getCpu = jest.fn().mockReturnValue('Intel(R) Core(TM) i7-4870HQ CPU @ 2.50GHz');
            SpecsController.getGpu = jest.fn().mockReturnValue('Intel Iris Pro, AMD Radeon R9 M370X');
            SpecsController.getRam = jest.fn().mockReturnValue('16GB');
            SpecsController.getStorage = jest.fn().mockReturnValue('465GB');

            await SpecsController.handle();
            expect(mockedSay).toHaveBeenCalledWith(`#${env.TWITCH_CHANNEL}`, outdent`
                CPU: Intel(R) Core(TM) i7-4870HQ CPU @ 2.50GHz
                GPU: Intel Iris Pro, AMD Radeon R9 M370X
                RAM: 16GB
                Storage: 465GB
            `);
        });
    });
});
