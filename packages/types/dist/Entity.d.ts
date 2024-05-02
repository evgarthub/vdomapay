export interface Entity extends Partial<DatabaseEntity> {
    key: number;
}
export interface DatabaseEntity {
    createdAt: string;
    updatedAt: string;
}
