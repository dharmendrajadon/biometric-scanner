"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const lusca = require("lusca");
// Import App Router, for Express App
const Index_1 = require("./routes/Index");
/**
 * Express configuration
 */
// For accessing FireStore database
admin.initializeApp();
// Create Express server
const app = express();
// WhiteList Domains
const whiteList = [
    'http://localhost:3000'
];
// CORS Configuration
const corsMiddleware = cors({
    methods: ['GET'],
    optionsSuccessStatus: 200,
    origin: whiteList
});
// Enable Cors in development
app.use(corsMiddleware);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Security Configuration
app.use(lusca({
    hsts: {
        includeSubDomains: true,
        maxAge: 31536000,
        preload: true
    },
    nosniff: true,
    referrerPolicy: 'same-origin',
    xframe: 'SAMEORIGIN',
    xssProtection: true
}));
/**
 * Application Routes.
 */
app.use('/api', Index_1.default);
// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});
// Basic error handler
app.use((err, req, res, next) => {
    // If our routes specified a specific response, then send that. Otherwise,
    // send a generic message so as not to leak anything.
    res.status(500).send(err.response || 'Something went wrong!');
});
// Unhandled Promise Rejection
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map