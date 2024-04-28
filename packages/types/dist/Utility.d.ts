import type { Entity } from "./Entity";
export interface UtilityData {
    id: string;
    name: string;
}
export interface Utility extends UtilityData, Entity {
}
