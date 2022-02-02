export const logger: {
  info: (message: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
} = {
  info: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";

    if (process.env && process.env.RUNNING_TESTS !== "true") {
      console.log(message, "MESSAGE&Info");
    }
  },
  debug: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    if (process.env && process.env.RUNNING_TESTS !== "true") {
      console.log(message, "MESSAGE&debug");
    }
  },
  error: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    if (process.env && process.env.RUNNING_TESTS !== "true") {
      console.log(message, "MESSAGE&Error");
    }
  },
};
