const express = require('express');
const router = require('./routes')
const app = express();
require('./database');

exports.app = app;

require('./config/session.config');
require('./config/passport.config');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next()
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.listen(3001);