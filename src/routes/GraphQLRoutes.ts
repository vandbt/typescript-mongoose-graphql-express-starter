import * as express from "express";
import GraphQLHTTP from "express-graphql";

import { printSchema } from "graphql/utilities/schemaPrinter";

import { graphqlSchema } from "../models/graphql/schema-index";

// example schema
// import { graphqlSchema } from "../ex.schema";

export class GraphQLRoutes {
    static map(app: express.Application): void {
        // Add GraphQL to express route
        app.use("/graphql", (req: express.Request, res: express.Response) => {
            // Creates a GraphQLHTTP per request
            GraphQLHTTP(request => {
                const startTime = Date.now();
                return {
                    schema: graphqlSchema,
                    graphiql: true,
                    extensions({ document, variables, operationName, result }) {
                        return { runTime: Date.now() - startTime };
                    }
                };
            })(req, res);
        });

        app.use(
            "/schema",
            // onlyAuthorized(),
            (req, res, _next) => {
                res.set("Content-Type", "text/plain");
                res.send(printSchema(graphqlSchema));
            }
        );
    }
}
