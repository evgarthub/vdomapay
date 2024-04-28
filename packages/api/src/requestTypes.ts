import { t } from "elysia";

export const utilityPostSchema = {
  detail: {
    tags: ["Utilities"],
  },
  body: t.Object({ id: t.String(), name: t.String() }),
};

export const utilityDeleteSchema = {
  detail: {
    tags: ["Utilities"],
  },
  params: t.Object({
    id: t.String(),
  }),
};

export const utilityGetSchema = {
  detail: {
    tags: ["Utilities"],
  },
};
