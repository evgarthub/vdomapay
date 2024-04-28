import { Elysia, t } from "elysia";
import { mainDatabase } from "./data/mainDatabase";
import { Utility } from "@vdomapay/types";
import { utilityPostSchema } from "./requestTypes";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", () => "Hello Elysia")
  .get("/utilities", async () => {
    const utilities = await mainDatabase.read<Utility[]>("utilities");
    return utilities;
  })
  .post(
    "/utilities",
    async ({ body }) => {
      const utility = await mainDatabase.create<Utility>("utilities", body);
      return utility;
    },
    utilityPostSchema
  )
  .onError(({ error }) => error)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
