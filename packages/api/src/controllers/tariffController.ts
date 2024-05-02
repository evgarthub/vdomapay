import { TariffData } from '@vdomapay/types';
import { BaseController } from './baseController';
import { t } from 'elysia';

const ENTITY_NAME = 'tariff';
export const tariffController = new BaseController<TariffData>(ENTITY_NAME);

export const tariffPostSchema = {
    detail: {
        tags: ['Tariffs'],
    },
    body: t.Object({
        id: t.String(),
        isAbsolute: t.Boolean(),
        sourceLink: t.String(),
        typeId: t.String(),
        limits: t.Array(
            t.Object({ price: t.Number(), maximum: t.Optional(t.Number()), minimum: t.Optional(t.Number()) }),
            {
                minItems: 1,
            },
        ),
        label: t.Optional(t.String()),
    }),
};

export const tariffDeleteSchema = {
    detail: {
        tags: ['Tariffs'],
    },
    params: t.Object({
        id: t.String(),
    }),
};

export const tariffGetSchema = {
    detail: {
        tags: ['Tariffs'],
    },
};

export const tariffPutSchema = {
    detail: {
        tags: ['Tariffs'],
    },
    body: t.Object({
        id: t.String(),
        isAbsolute: t.Boolean(),
        sourceLink: t.String(),
        typeId: t.String(),
        limits: t.Array(
            t.Object({ price: t.Number(), maximum: t.Optional(t.Number()), minimum: t.Optional(t.Number()) }),
            {
                minItems: 1,
            },
        ),
        label: t.Optional(t.String()),
        key: t.Number(),
    }),
};
