import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import {
    tariffController,
    tariffDeleteSchema,
    tariffGetSchema,
    tariffPostSchema,
    tariffPutSchema,
    utilityController,
    utilityDeleteSchema,
    utilityGetSchema,
    utilityPostSchema,
    utilityPutSchema,
} from './controllers';

export const createServer = () =>
    new Elysia()
        .use(cors())
        .use(
            swagger({
                documentation: {
                    tags: [
                        { name: 'Utilities', description: 'CRUD operations on Utilities' },
                        { name: 'Records', description: 'CRUD operations on Records' },
                        { name: 'Tariffs', description: 'CRUD operations on Tariffs' },
                        { name: 'Bills', description: 'CRUD operations on Bills' },
                    ],
                },
            }),
        )

        // Utilities routes -----------------------------------------------------
        .get(
            '/utilities',
            async () => {
                return await utilityController.get();
            },
            utilityGetSchema,
        )
        .delete(
            '/utilities/:id',
            async ({ params }) => {
                return await utilityController.delete(params.id);
            },
            utilityDeleteSchema,
        )
        .post(
            '/utilities',
            async ({ body }) => {
                return await utilityController.post(body);
            },
            utilityPostSchema,
        )
        .put(
            '/utilities/:id',
            async ({ params, body }) => {
                return await utilityController.put(params.id, body);
            },
            utilityPutSchema,
        )

        // Tariffs routes -----------------------------------------------------
        .get(
            '/tariffs',
            async () => {
                return await tariffController.get();
            },
            tariffGetSchema,
        )
        .delete(
            '/tariffs/:id',
            async ({ params }) => {
                return await tariffController.delete(params.id);
            },
            tariffDeleteSchema,
        )
        .post(
            '/tariffs',
            async ({ body }) => {
                return await tariffController.post(body as any);
            },
            tariffPostSchema,
        )
        .put(
            '/tariffs/:id',
            async ({ params, body }) => {
                return await tariffController.put(params.id, body as any);
            },
            tariffPutSchema,
        )

        .onError(({ error }) => error)
        .listen(3000);
