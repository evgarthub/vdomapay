import type { Entity } from './Entity';
type MinOneArray<T> = [T, ...T[]];
export interface TariffLimit {
    price: number;
    maximum?: number;
    minimum?: number;
}
export interface TariffData {
    id: string;
    isAbsolute: boolean;
    sourceLink: string;
    typeId: string;
    limits: MinOneArray<TariffLimit[]>;
    label?: string;
}
export interface Tariff extends TariffData, Entity {
}
export {};
