import { exec } from 'child_process';
import { RiddleController } from './RiddleController';

export class SceneController {
    public static changeToPrimaryScene() {
        this.runCommand('touch ./scenes/primary');
    }

    public static changeToFishCamScene() {
        this.runCommand('touch ./scenes/fish');
    }

    public static changeToWinnerScene() {
        this.runCommand('touch ./scenes/winner');
    }

    private static runCommand(command: string) {
        exec(command, () => {});
    }
}
