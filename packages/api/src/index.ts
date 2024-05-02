import { createServer } from './createServer';

const app = createServer();

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
