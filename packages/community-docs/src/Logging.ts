const fs = require("fs");
import path from "path";

const loggingLocation = (fileName: string) =>
  path.join(__dirname, "logs", `./${fileName}`);

const infoStream = fs.createWriteStream(loggingLocation("info.md"), {
  encoding: "utf-8",
});
const errorStream = fs.createWriteStream(loggingLocation("error.md"), {
  encoding: "utf-8",
});
const debugStream = fs.createWriteStream(loggingLocation("debug.md"), {
  encoding: "utf-8",
});

export const Logger: {
  info: (message: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
} = {
  info: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    infoStream.write(message);
  },
  debug: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    debugStream.write(message);
  },
  error: (msg) => {
    const message = new Date().toISOString() + " : " + "\n" + msg + "\n";
    errorStream.write(message);
  },
};
