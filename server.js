'use strict';

const { Client } = require('pg');
const Hapi = require('@hapi/hapi');
require('dotenv').config();

//Starting server
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    //Getting db-connection
    require('./db/db');

    //Getting routes
    require('./routes/drama.route')(server);
    
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();