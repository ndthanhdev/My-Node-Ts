import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as favicon from "serve-favicon";

// routes
import * as test1 from "./Test";
import * as test2 from "./routes/Test2";

// creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */

    this.express.use("/", test1);
    this.express.use("/2", test2);
  }

}

export default new App().express;