import {
    GraphQLSchema,
    GraphQLObjectType,
} from 'graphql';

// Import each models schema
import { AuthorSchema } from './author';
import { CommentSchema } from './comment';
import { PostSchema } from './post';

export const graphqlSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => Object.assign(
            AuthorSchema.query,
            CommentSchema.query,
            PostSchema.query,
        )
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => Object.assign(
            AuthorSchema.mutation,
            CommentSchema.mutation,
            PostSchema.mutation,
        )
    }),
    // subscription: new GraphQLObjectType({
    //     name: 'Subscription',
    //     fields: () => Object.assign(
    //         UserSchema.subscription,
    //         ProductSchema.subscription,
    //     )
    // }),
    types: [
            ...AuthorSchema.types,
            ...CommentSchema.types,
            ...PostSchema.types,
    ]
});

