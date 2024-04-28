import { mainDatabase } from "../data";

export const deleteUtility = async (id: string) => {
  await mainDatabase.delete("utilities", `WHERE id = ${id}`);
};
