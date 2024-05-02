import type { Entity } from './Entity';
export interface UtilityData {
    id: string;
    name: string;
    unit: string;
}
export interface Utility extends UtilityData, Entity {
}
