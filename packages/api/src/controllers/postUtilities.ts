import { Utility } from "@vdomapay/types";
import { mainDatabase } from "../data";

export const postUtilities = async (body: {
  name: string;
  id: string;
}): Promise<Utility | undefined> => {
  const createdUtility = await mainDatabase.create<Utility>("utilities", body);
  return createdUtility;
};
