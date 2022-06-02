export const logger: {
  info: (message: string) => void;

  error: (message: string) => void;
} = {
  info: (msg) => {
    const message = "\n" + msg + "\n";

    if (process.env.RUNNING_TESTS !== "true") {
      console.log(message);
    }
  },

  error: (msg) => {
    const message = " : " + "\n" + msg + "\n";
    if (process.env.RUNNING_TESTS !== "true") {
      console.log(message);
    }
  },
};
