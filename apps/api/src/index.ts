    import fastify from 'fastify';

    // Initializes the Fastify application
    const app = fastify({
        logger: true, // Enables the logger so we can see requests in the terminal
    });

    // Defines a test route
    app.get('/', async (_request, _reply) => {
        return { hello: 'world' };
    });

    // Function to start the server
    const start = async () => {
        try {
            await app.listen({ port: 3333, host: '0.0.0.0' });
        } catch (err) {
            app.log.error(err);
            process.exit(1);
        }
    };

    // Starts the server
    start();