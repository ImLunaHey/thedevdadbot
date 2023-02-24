import { Client } from 'tmi.js';
import fs from 'fs';
import { SceneController } from './SceneController';
import { setTimeout } from 'timers/promises';

export class RiddleController {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public handle(username: string, message: string) {
        const riddle = 'what goes up but never comes down?';
        const answer = 'age';

        if (this.isRiddleRequest(message)) {
            this.handleRiddleRequest(riddle);
        } else {
            this.handleRiddleAnswerAttempt(username, message, answer);
        }
    }

    private isRiddleRequest(message: string) {
        return message.toLowerCase() === '!riddle';
    }

    private isRiddleAnswerAttempt(message: string) {
        return message.toLowerCase().startsWith('!riddle ');
    }

    private handleRiddleRequest(riddle: string) {
        this.client.say('#thedevdad_', `daily riddle: ${riddle}`);
    }

    private handleRiddleAnswerAttempt(username: string, message: string, answer: string) {
        if (answer.toLowerCase() === message.toLowerCase()) {
            this.handleCorrectAnswer(username);
        }
    }

    private handleCorrectAnswer(username: string) {
        this.client.say('#thedevdad_', `${username}, you got the riddle correct!`);

        this.changeSceneToWinner();

        if (!RiddleController.someoneHasWon()) {
            this.writeUserToWinnerFile(username);
        }
    }

    changeSceneToWinner() {
        SceneController.changeToWinnerScene();
        setTimeout(10000).then(() => {
            SceneController.changeToPrimaryScene();
        });
    }

    public static someoneHasWon() {
        return fs.existsSync(`out/winner.txt`) && fs.readFileSync(`out/winner.txt`).toString() !== 'unsolved!';
    }

    private writeUserToWinnerFile(username: string) {
        fs.writeFileSync(`out/winner.txt`, username);
    }
}
