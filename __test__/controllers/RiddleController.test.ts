import { RiddleController } from '@app/controllers/RiddleController';
import { env } from '@app/env';
import { twitchClient } from '@app/twitch-client';

jest.mock('@app/twitch-client');

describe('RiddleController', () => {
    afterEach(() => {
        // Make sure to restore all mocks after each test
        // This is important because we're mocking the same functions in multiple tests
        jest.restoreAllMocks();
    });

    describe('handle', () => {
        it('should return a riddle', async () => {
            const mockedSay = jest.mocked(twitchClient.say);
            await RiddleController.handle('!riddle', 'randomUser');
            expect(mockedSay).toHaveBeenCalledWith(`#${env.TWITCH_CHANNEL}`, 'daily riddle: What is the object-oriented way to become wealthy?');
        });
    });

    describe('handleRiddleAnswerAttempt', () => {
        it('should do nothing if the answer is incorrect', async () => {
            const username = 'randomUser';
            const message = 'wrong_answer';
            const answer = 'inheritance';

            await expect(RiddleController.handleRiddleAnswerAttempt(username, message, answer)).resolves.toBe(undefined);
        });

        it('should handle a correct answer', async () => {
            const username = 'randomUser';
            const message = 'inheritance';
            const answer = 'inheritance';
            const mockedHandleCorrectAnswer = jest.spyOn(RiddleController, 'handleCorrectAnswer');

            await RiddleController.handleRiddleAnswerAttempt(username, message, answer);

            expect(mockedHandleCorrectAnswer).toHaveBeenCalledWith(username);
        });
    });

    describe('handleCorrectAnswer', () => {
        it('should write the user to the winner file', async () => {
            const username = 'randomUser';
            const mockedWriteFile = jest.spyOn(RiddleController, 'writeUserToWinnerFile');
            jest.spyOn(RiddleController, 'changeSceneToWinner').mockImplementation();
            jest.spyOn(RiddleController, 'someoneHasWon').mockImplementation(() => Promise.resolve(false));

            await RiddleController.handleCorrectAnswer(username);
            expect(mockedWriteFile).toHaveBeenCalledWith(username);
        });

        it('should skip writing the user to the winner file if there\'s already a winner', async () => {
            const username = 'randomUser';
            const mockedWriteFile = jest.spyOn(RiddleController, 'writeUserToWinnerFile');
            jest.spyOn(RiddleController, 'changeSceneToWinner').mockImplementation();
            jest.spyOn(RiddleController, 'someoneHasWon').mockImplementation(() => Promise.resolve(true));

            await RiddleController.handleCorrectAnswer(username);
            expect(mockedWriteFile).toHaveBeenCalledTimes(0);
        });
    });
});
