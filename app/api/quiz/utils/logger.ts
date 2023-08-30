import fs from "fs";
import { ZodError } from "zod";

export class Logger {
  error: unknown | Error;
  message: string;
  errors: string[];
  constructor(error: unknown, filename: string) {
    const message = `\n\n[${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}] [${filename}]: \n${error}`;
    this.error = error;
    this.message = "";
    this.errors = [];
    if (fs.existsSync("error.log")) {
      fs.appendFileSync("error.log", message);
    } else {
      fs.writeFileSync("error.log", message);
    }
    this.generateErrorMessage();
  }

  getErrorMessage() {
    return this.generateErrorMessage();
  }

  generateErrorMessage() {
    // let errors: string[] = [];
    if (this.error instanceof ZodError) {
      console.log("this is zod error");
      this.error.errors.map((error) => {
        if (error.code == "invalid_type") {
          this.message = error.message;
          this.errors.push("invalid type " + (error.path?.[0] ?? error.path) + "  " + error.message);
        } else if (error.code == "invalid_string") {
          this.message = error.message;
          this.errors.push("invalid string " + (error.path?.[0] ?? error.path) + "  " + error.message);
        } else if (error.code === "custom") {
          this.message = error.message;
          this.errors.push("custom error ---> " + error.message);
        }
      });
    } else if (this.error instanceof Error) {
      console.log("this is error");
      this.message = this.error.message;
    }
  }
}