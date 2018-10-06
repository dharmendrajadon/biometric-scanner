import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as lusca from 'lusca';

// Import App Router, for Express App
import router from './routes/Index';

/**
 * Express configuration
 */

// For accessing FireStore database
admin.initializeApp();

// Create Express server
const app = express();

// WhiteList Domains
const whiteList: string[] = [
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
app.use('/', router);

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send({ message: 'Not Found' });
});

// Basic error handler
app.use((err: any, req: any, res: any, next: any) => {
    // If our routes specified a specific response, then send that. Otherwise,
    // send a generic message so as not to leak anything.
    res.status(500).send(err.response || 'Something went wrong!');
});

// Unhandled Promise Rejection
process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

export const api = functions.https.onRequest(app);
