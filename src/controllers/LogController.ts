export class LogController {
    public static log(user: string, message: string) {
        console.log(`\x1b[32m[${new Date().toLocaleTimeString()}] ${user}: ${message}\x1b[0m\n`);
    }
}
