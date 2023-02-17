const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const { app } = require('../index');

app.use(session({
    secret: 'cersei',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 14 * 1000,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 60 * 60 * 24 * 14,
    })
}));