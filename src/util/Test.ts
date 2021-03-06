import { testRoot } from '../App';
import http from 'http';
import ServerBuilder from 'express-quick-builder';
import mongoose from 'mongoose';

let rootInstance: ReturnType<typeof ServerBuilder['serverStarter']> | undefined;

async function createServer(): Promise<http.Server> {
  rootInstance = await testRoot(63000);
  return rootInstance.server;
}

function closeServer(
  done: any = function (): void {
    return;
  },
): void {
  if (!rootInstance) throw new Error('Root instance is not initialized!');
  rootInstance.server.close();
  mongoose.connection.close();
  rootInstance = undefined;
  done();
}

export default {
  server: {
    create: createServer,
    close: closeServer,
    instance: rootInstance,
  },
};
