import { setTimeout } from 'timers/promises';
import { SceneController } from './SceneController';

export class FishController {
    public handle(message: string) {
        if (message.toLocaleLowerCase() === '!fishcam') {
            this.runFishCam(10000);
            return;
        }

        if (message.split(' ').length === 2) {
            if (message.split(' ')[0] === '!fishcam') {
                const durationStr: string = message.split(' ')[1];

                let duration = parseInt(durationStr) * 1000;
                if (duration < 300 || duration > 30000) {
                    duration = 20000;
                }

                this.runFishCam(duration);
            }
        }
    }

    public runFishCam(duration: number) {
        SceneController.changeToFishCamScene();

        setTimeout(duration).then(() => {
            SceneController.changeToPrimaryScene();
        });
    }
}
