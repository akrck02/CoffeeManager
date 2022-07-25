export default class Logger {

    private static DEBUG = "DEBUG";
    private static INFO = "INFO";
    private static ERROR = "ERROR";
    private static WARNING = "WARNING"; 

    private static now() :string {
        const now = new Date();
        return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    }

    public static info(message: string) {
        Logger.log(this.INFO,message);
    }

    public static error(message: string) {
        Logger.log(this.ERROR,message);
    }

    public static warn(message: string) {
        Logger.log(this.WARNING,message);
    }

    public static debug(message: string) {
        Logger.log(this.DEBUG,message);
    }

    private static log(type:string,message: string) {
        console.log(`${Logger.now()} ${type} ${message}`)
    }

}