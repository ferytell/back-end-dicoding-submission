const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
                credentials: true,
            },
        },
    });
//---------------------------------------------------------------
//---------------------------------------------------------------
    server.route(routes);
    await server.start((err) => {
        if(err){
            throw err;
        }
    });
    console.log(`Server berjalan pada: ${server.info.uri}`);
    
}
init();
