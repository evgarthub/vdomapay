import { Utility } from "@vdomapay/types";
import { mainDatabase } from "../data";

export const deleteUtility = async (id: string) => {
  await mainDatabase.delete("utilities", `id = '${id}'`);
};

export const getUtilities = async (): Promise<Utility[]> => {
  const utilities = await mainDatabase.read<Utility>("utilities");
  return utilities;
};

export const postUtilities = async (body: {
  name: string;
  id: string;
}): Promise<Utility | undefined> => {
  const createdUtility = await mainDatabase.create<Utility>("utilities", body);
  return createdUtility;
};
