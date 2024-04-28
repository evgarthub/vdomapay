import { Utility } from "@vdomapay/types";
import { mainDatabase } from "../data";

export const getUtilities = async (): Promise<Utility[]> => {
  const utilities = await mainDatabase.read<Utility>("utilities");
  return utilities;
};
