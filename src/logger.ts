const colours = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
} as const;
const resetColor = '\x1b[0m';

class Logger {
    logChat(user: string, message: string) {
        const prefix = this.colorizeString(`[${new Date().toLocaleTimeString()}] [CHAT]`, 'blue');
        const finalMessage = this.colorizeString(`${user}: ${message}`, 'white');
        console.log(`${prefix} ${finalMessage}`);
    }

    log(message: string) {
        const prefix = this.colorizeString(`[${new Date().toLocaleTimeString()}] [APP]`, 'green');
        const finalMessage = this.colorizeString(message, 'white');
        console.log(`${prefix} ${finalMessage}`);
    }

    error(message: string) {
        const prefix = this.colorizeString(`[${new Date().toLocaleTimeString()}] [APP]`, 'red');
        const finalMessage = this.colorizeString(message, 'red');
        console.log(`${prefix} ${finalMessage}`);
    }

    colorizeString(string: string, colour: keyof typeof colours) {
        return `\x1b[${colours[colour]}m${string}${resetColor}`;
    }
}

export const logger = new Logger();