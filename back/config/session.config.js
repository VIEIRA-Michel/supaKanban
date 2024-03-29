const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');
const { app } = require('../app');

app.use(
    session({
        secret: 'cersei',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        },
        store: MongoStore.create({
            clientPromise: clientPromise.then((m) => m.connection.getClient()),
            ttl: 1000 * 60 * 60 * 24,
        }),
    })
);
