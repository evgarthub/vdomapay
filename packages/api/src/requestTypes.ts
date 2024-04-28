import { t } from "elysia";

export const utilityPostSchema = {
  body: t.Object({ id: t.String(), name: t.String() }),
};

export type UtilitiesPostRequest = typeof utilityPostSchema.body;
