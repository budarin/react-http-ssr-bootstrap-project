import { Server } from 'net';
import { Context } from 'koa';
import pgPool from '../utils/getPgPool';

const gracefullSutdown = (server: Server, forceTimeout: number) => {
    let shuttingDown = false;

    process.on('SIGINT', gracefulExit);
    process.on('SIGTERM', gracefulExit);
    process.on('uncaughtException', err => {
        if (__DEV__) {
            // tslint:disable-next-line
            console.log('Необработанная ошибка приложения', err.stack);
        }
        process.exit(1);
    });

    function gracefulExit() {
        // Don't bother with graceful shutdown on development to speed up round trip
        if (__DEV__) {
            return process.exit(1);
        }

        if (shuttingDown) {
            return;
        }

        shuttingDown = true;

        if (__DEV__) {
            // tslint:disable-next-line
            console.log('Received kill signal (SIGTERM), shutting down');
        }

        setTimeout(() => {
            if (__DEV__) {
                // tslint:disable-next-line
                console.log('Could not close connections in time, forcefully shutting down');
            }

            process.exit(1);
        }, forceTimeout).unref();

        server.close(() => {
            if (__DEV__) {
                // tslint:disable-next-line
                console.log('Closed out remaining connections.');
            }

            pgPool.end();
            process.exit();
        });

        return;
    }

    const middleware = async (ctx: Context, next: () => {}) => {
        if (!shuttingDown) {
            await next();
        } else {
            ctx.set('Connection', 'close');
            ctx.status = 503;
            ctx.body = 'Server is in the process of restarting.';
        }
    };

    return middleware;
};

export default gracefullSutdown;
