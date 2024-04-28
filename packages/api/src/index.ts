import { Elysia } from "elysia";
import {
  utilityDeleteSchema,
  utilityGetSchema,
  utilityPostSchema,
} from "./requestTypes";
import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import {
  postUtilities,
  getUtilities,
  deleteUtility,
} from "./controllers/utilityController";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        tags: [
          { name: "Utilities", description: "CRUD operations on Utilities" },
          { name: "Records", description: "CRUD operations on Records" },
          { name: "Tariffs", description: "CRUD operations on Tariffs" },
          { name: "Bills", description: "CRUD operations on Bills" },
        ],
      },
    })
  )
  .get(
    "/utilities",
    async () => {
      return await getUtilities();
    },
    utilityGetSchema
  )
  .delete(
    "/utilities/:id",
    async ({ params }) => {
      return await deleteUtility(params.id);
    },
    utilityDeleteSchema
  )
  .post(
    "/utilities",
    async ({ body }) => {
      return await postUtilities(body);
    },
    utilityPostSchema
  )
  .onError(({ error }) => error)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
