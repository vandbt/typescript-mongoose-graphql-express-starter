import express from "express";
import session from "express-session";
import logger from "./util/logger";
import graphqlHTTP from "express-graphql";
import cors from "cors";
import errorHandler from "errorhandler";
import bodyParser from "body-parser";
import { printSchema } from "graphql/utilities/schemaPrinter";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mongo from "connect-mongo";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

// Import all routes
import { GraphQLRoutes } from "./routes";

const DEBUG_MODE = true;
const GRAPHQL_PORT = 3000;
const MongoStore = mongo(session);

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

import { setupPassportAuth, onlyAuthorized } from "./authenticate";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
(<any>mongoose).Promise = bluebird;
mongoose
    .connect(mongoUrl, { useMongoClient: true })
    .then(() => {
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    })
    .catch(err => {
        console.log(
            "MongoDB connection error. Please make sure MongoDB is running. " +
                err
        );
        // process.exit();
    });

// Express configuration
app.set("port", process.env.PORT || GRAPHQL_PORT);
// Parse application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// Parse application/json
app.use(bodyParser.json());

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true
        })
    })
);

// Example routes
app.get("/", (req, res) => {
    res.status(200).send("Server endpoint");
});

app.get("/ping", (req, res) => {
    res.status(200).send("pong");
});

// Set Auth
setupPassportAuth(app, DEBUG_MODE);

// map graphql routes
GraphQLRoutes.map(app);


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        app.get("port"),
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
