import { t } from 'elysia';
import { UtilityData } from '@vdomapay/types';
import { BaseController } from './baseController';

const ENTITY_NAME = 'utility';
export const utilityController = new BaseController<UtilityData>(ENTITY_NAME);

export const utilityPostSchema = {
    detail: {
        tags: ['Utilities'],
    },
    body: t.Object({ id: t.String(), name: t.String(), unit: t.String() }),
};

export const utilityDeleteSchema = {
    detail: {
        tags: ['Utilities'],
    },
    params: t.Object({
        id: t.String(),
    }),
};

export const utilityGetSchema = {
    detail: {
        tags: ['Utilities'],
    },
};

export const utilityPutSchema = {
    detail: {
        tags: ['Utilities'],
    },
    body: t.Object({ id: t.String(), name: t.String(), unit: t.String(), key: t.Number() }),
};
