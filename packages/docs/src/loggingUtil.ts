export const logger: {
  info: (message: string) => void;

  error: (message: string) => void;
} = {
  info: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";

    if (process.env && process.env.RUNNING_TESTS !== "true") {
      console.log(message, "MESSAGE&Info");
    }
  },

  error: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    if (process.env && process.env.RUNNING_TESTS !== "true") {
      console.log(message, "MESSAGE&Error");
    }
  },
};
