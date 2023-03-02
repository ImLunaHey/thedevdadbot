import { mkdir, readFile, writeFile } from 'fs/promises';
import { SceneController } from '@app/controllers/SceneController';
import { setTimeout } from 'timers/promises';
import { twitchClient } from '@app/twitch-client';
import { env } from '@app/env';

export class RiddleController {
    public static handle(message: string, username: string) {
        const riddle = 'What is the object-oriented way to become wealthy?';
        const answer = 'inheritance';

        // Start a new riddle
        if (RiddleController.isRiddleRequest(message)) return RiddleController.handleRiddleRequest(riddle);

        // User attempting to answer the riddle
        return RiddleController.handleRiddleAnswerAttempt(username, message, answer);
    }

    public static isRiddleRequest(message: string) {
        return message.toLowerCase() === '!riddle';
    }

    public static isRiddleAnswerAttempt(message: string) {
        return message.toLowerCase().startsWith('!riddle ');
    }

    public static async handleRiddleRequest(riddle: string) {
        await twitchClient.say(`#${env.TWITCH_CHANNEL}`, `daily riddle: ${riddle}`);
    }

    public static async handleRiddleAnswerAttempt(username: string, message: string, answer: string) {
        if (answer.toLowerCase() === message.toLowerCase()) {
            await RiddleController.handleCorrectAnswer(username);
        }
    }

    public static async handleCorrectAnswer(username: string) {
        await twitchClient.say(`#${env.TWITCH_CHANNEL}`, `${username}, you got the riddle correct!`);

        RiddleController.changeSceneToWinner();

        if (!(await RiddleController.someoneHasWon())) await RiddleController.writeUserToWinnerFile(username);
    }

    public static changeSceneToWinner() {
        SceneController.changeToWinnerScene();
        void setTimeout(10_000).then(() => {
            SceneController.changeToPrimaryScene();
        });
    }

    public static async someoneHasWon() {
        try {
            const text = await readFile('out/winner.txt', 'utf-8');
            return text !== 'unsolved!';
        } catch {
            return false;
        }
    }

    public static async writeUserToWinnerFile(username: string) {
        // Create the out directory if it doesn't exist
        await mkdir('out').catch(error => {
            // Ignore the error if the directory already exists
            if ((error as { code: string }).code !== 'EEXIST') throw error;
        });

        // Write the username to the winner file
        await writeFile('out/winner.txt', username);
    }
}
