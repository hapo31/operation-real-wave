import { createRoute, OpenAPIHono } from "npm:@hono/zod-openapi";
import { swaggerUI } from "npm:@hono/swagger-ui";
import { Context } from "npm:hono";
import { ZodError } from "npm:zod";
import { ZodSchema } from "npm:zod";

export class OpenAPIHonoWA extends OpenAPIHono { // WorkAround
  constructor() {
    super();
  }

  add<
    Path extends string,
    RequestSchema extends ZodSchema,
    ResultSchema extends ZodSchema,
  >(
    args: AddRouteArgs<Path, RequestSchema, ResultSchema>,
    handler: (
      result: Zod.infer<RequestSchema>,
      c: Context,
    ) => Promise<Zod.infer<ResultSchema>> | Zod.infer<ResultSchema>,
  ) {
    const { method, path, request, response } = args;
    this.openapi(
      createRoute({
        path,
        method,
        request: {
          body: request
            ? {
              required: request?.required ?? false,
              content: {
                "application/json": {
                  schema: request.schema,
                },
              },
            }
            : undefined,
        },
        responses: response
          ? Object.fromEntries(
            Object.entries(response).map(
              ([code, response]) => [code, {
                content: {
                  "application/json": {
                    schema: response.schema,
                  },
                },
                description: response.description,
              }],
            ),
          )
          : {},
      }),
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      async (r, c) => {
        try {
          if (!r.result.success) {
            console.log("%o", r.result);
            throw new ZodError(r.result.error);
          }
          const handlerResult = await handler(r.result, c);
          const schema = response?.[200]?.schema;
          schema?.parse(handlerResult);
          return c.json(handlerResult);
        } catch (e) {
          if (e instanceof ZodError) {
            c.status(400);
            return c.json({ error: e.errors });
          }
          if (e instanceof HttpException) {
            c.status(e.status);
            const schema = response?.[e.status]?.schema;
            schema?.parse(e.message);
            return c.json({ error: e.message });
          }
          throw e;
        }
      },
    );

    return this;
  }

  swagger(docPath: string, uiPath: string) {
    this.doc31(docPath, {
      openapi: "3.1.0",
      info: {
        title: "API",
        version: "1.0.0",
      },
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
    }).get(
      uiPath,
      swaggerUI({
        url: docPath,
      }),
    );

    return this;
  }

  serve() {
    // deno-lint-ignore ban-ts-comment
    // @ts-ignore
    Deno.serve(this.fetch);
  }
}

export class HttpException<T extends object> extends Error {
  constructor(public status: number, public response: T) {
    super(JSON.stringify(response));
  }
}

type ZodMaybe<T> = { success: true; data: T } | {
  success: false;
  error: ZodError;
};

type AddRouteArgs<
  Path extends string,
  RequestSchema extends ZodSchema,
  ResponseSchema extends ZodSchema,
> = {
  path: Path;
  method: string;
  request?: { schema: RequestSchema; required?: boolean; description?: string };
  response?: {
    [Code in number]: { schema: ResponseSchema; description?: string };
  };
};
