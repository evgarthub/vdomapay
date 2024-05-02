import { mainDatabase } from '@data';
import { Entity } from '@vdomapay/types/dist/Entity';
import { getPluralName } from '@utils/getPluralName';

type EntityWithData<TData> = TData & Entity;

export class BaseController<TData extends Record<string, any>> {
    #tableName: string;

    constructor(entityName: string) {
        this.#tableName = getPluralName(entityName);
    }

    delete = async (id: string) => {
        await mainDatabase.delete(this.#tableName, `id = '${id}'`);
    };

    get = async (): Promise<EntityWithData<TData>[]> => {
        const tariffs = await mainDatabase.read<EntityWithData<TData>>(this.#tableName);

        return tariffs;
    };

    post = async (body: TData): Promise<EntityWithData<TData> | undefined> => {
        const createdTariff = await mainDatabase.create<EntityWithData<TData>>(this.#tableName, body);

        return createdTariff;
    };

    put = async (id: string, body: EntityWithData<TData>): Promise<void> => {
        await mainDatabase.update<EntityWithData<TData>>(this.#tableName, body, `id = '${id}'`);
    };
}
